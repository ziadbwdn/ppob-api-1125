// src/services/informationService.js
const { AppDataSource } = require('../../database/data-source');

class InformationService {
  async getBanners() {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      const query = `
        SELECT banner_name, banner_image, description
        FROM banners
        ORDER BY "createdAt" DESC
      `;
      const banners = await queryRunner.query(query);
      return banners;
    } catch (error) {
      throw { statusCode: 500, status: 999, message: 'Internal server error' };
    } finally {
      await queryRunner.release();
    }
  }

  async getServices() {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      const query = `
        SELECT service_code, service_name, service_icon, service_tariff
        FROM services
        ORDER BY "createdAt" DESC
      `;
      const services = await queryRunner.query(query);
      return services;
    } catch (error) {
      throw { statusCode: 500, status: 999, message: 'Internal server error' };
    } finally {
      await queryRunner.release();
    }
  }

  async getServiceByCode(serviceCode) {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      const query = `
        SELECT service_code, service_name, service_icon, service_tariff
        FROM services
        WHERE service_code = $1
      `;
      const services = await queryRunner.query(query, [serviceCode]);
      return services.length > 0 ? services[0] : null;
    } catch (error) {
      throw { statusCode: 500, status: 999, message: 'Internal server error' };
    } finally {
      await queryRunner.release();
    }
  }
}

module.exports = new InformationService();
