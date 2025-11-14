// src/services/transactionService.js
const { AppDataSource } = require('../../database/data-source');
const informationService = require('./informationService');

class TransactionService {
  async getBalance(email) {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      const query = 'SELECT balance FROM accounts WHERE email = $1';
      const accounts = await queryRunner.query(query, [email]);

      if (accounts.length === 0) {
        throw { statusCode: 400, status: 108, message: 'Token tidak tidak valid atau kadaluwarsa' };
      }

      return accounts[0];
    } catch (error) {
      if (error.statusCode) throw error;
      throw { statusCode: 500, status: 999, message: 'Internal server error' };
    } finally {
      await queryRunner.release();
    }
  }

  async topup(email, amount) {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      await queryRunner.startTransaction();

      // Update balance
      const updateQuery = `
        UPDATE accounts
        SET balance = balance + $1
        WHERE email = $2
        RETURNING balance
      `;
      const result = await queryRunner.query(updateQuery, [amount, email]);

      if (result.length === 0) {
        throw { statusCode: 400, status: 108, message: 'Token tidak tidak valid atau kadaluwarsa' };
      }

      const newBalance = result[0].balance;

      // Create transaction record
      const invoiceNumber = this.generateInvoiceNumber();
      const transactionQuery = `
        INSERT INTO transactions (invoice_number, email, transaction_type, description, total_amount)
        VALUES ($1, $2, $3, $4, $5)
      `;
      await queryRunner.query(transactionQuery, [invoiceNumber, email, 'TOPUP', 'Top Up balance', amount]);

      await queryRunner.commitTransaction();

      return { balance: newBalance };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      if (error.statusCode) throw error;
      throw { statusCode: 500, status: 999, message: 'Internal server error' };
    } finally {
      await queryRunner.release();
    }
  }

  async transaction(email, serviceCode) {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      await queryRunner.startTransaction();

      // Get service details
      const service = await informationService.getServiceByCode(serviceCode);
      if (!service) {
        throw { statusCode: 400, status: 102, message: 'Service ataus Layanan tidak ditemukan' };
      }

      // Check balance
      const balanceQuery = 'SELECT balance FROM accounts WHERE email = $1 FOR UPDATE';
      const accounts = await queryRunner.query(balanceQuery, [email]);

      if (accounts.length === 0) {
        throw { statusCode: 400, status: 108, message: 'Token tidak tidak valid atau kadaluwarsa' };
      }

      const currentBalance = accounts[0].balance;
      if (currentBalance < service.service_tariff) {
        throw { statusCode: 400, status: 102, message: 'Saldo anda tidak cukup' };
      }

      // Deduct balance
      const updateQuery = `
        UPDATE accounts
        SET balance = balance - $1
        WHERE email = $2
      `;
      await queryRunner.query(updateQuery, [service.service_tariff, email]);

      // Create transaction record
      const invoiceNumber = this.generateInvoiceNumber();
      const transactionQuery = `
        INSERT INTO transactions (invoice_number, email, transaction_type, description, total_amount, service_code)
        VALUES ($1, $2, $3, $4, $5, $6)
      `;
      await queryRunner.query(transactionQuery, [
        invoiceNumber,
        email,
        'PAYMENT',
        service.service_name,
        service.service_tariff,
        serviceCode,
      ]);

      await queryRunner.commitTransaction();

      return {
        invoice_number: invoiceNumber,
        service_code: service.service_code,
        service_name: service.service_name,
        transaction_type: 'PAYMENT',
        total_amount: service.service_tariff,
        created_on: new Date().toISOString(),
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      if (error.statusCode) throw error;
      throw { statusCode: 500, status: 999, message: 'Internal server error' };
    } finally {
      await queryRunner.release();
    }
  }

  async getTransactionHistory(email, limit = null, offset = 0) {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      let query = `
        SELECT invoice_number, transaction_type, description, total_amount, "createdAt" as created_on
        FROM transactions
        WHERE email = $1
        ORDER BY "createdAt" DESC
      `;
      const params = [email];
      let paramCount = 2;

      if (offset) {
        query += ` OFFSET $${paramCount}`;
        params.push(offset);
        paramCount++;
      }

      if (limit) {
        query += ` LIMIT $${paramCount}`;
        params.push(limit);
      }

      const transactions = await queryRunner.query(query, params);

      return {
        offset: offset || 0,
        limit: limit || transactions.length,
        records: transactions,
      };
    } catch (error) {
      throw { statusCode: 500, status: 999, message: 'Internal server error' };
    } finally {
      await queryRunner.release();
    }
  }

  generateInvoiceNumber() {
    const now = new Date();
    const dateStr = `${now.getDate().toString().padStart(2, '0')}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getFullYear()}`;
    const randomNum = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(3, '0');
    return `INV${dateStr}-${randomNum}`;
  }
}

module.exports = new TransactionService();
