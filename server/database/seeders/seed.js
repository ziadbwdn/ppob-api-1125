// database/seeders/seed.js
const { AppDataSource } = require('../data-source');

const seedData = async () => {
  try {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();

    // Seed banners
    const bannerInsertQuery = `
      INSERT INTO banners (banner_name, banner_image, description, "createdAt", "updatedAt")
      VALUES
        ($1, $2, $3, NOW(), NOW()),
        ($4, $5, $6, NOW(), NOW()),
        ($7, $8, $9, NOW(), NOW()),
        ($10, $11, $12, NOW(), NOW()),
        ($13, $14, $15, NOW(), NOW()),
        ($16, $17, $18, NOW(), NOW())
      ON CONFLICT DO NOTHING
    `;

    await queryRunner.query(bannerInsertQuery, [
      'Banner 1',
      'https://nutech-integrasi.app/dummy.jpg',
      'Lerem Ipsum Dolor sit amet',
      'Banner 2',
      'https://nutech-integrasi.app/dummy.jpg',
      'Lerem Ipsum Dolor sit amet',
      'Banner 3',
      'https://nutech-integrasi.app/dummy.jpg',
      'Lerem Ipsum Dolor sit amet',
      'Banner 4',
      'https://nutech-integrasi.app/dummy.jpg',
      'Lerem Ipsum Dolor sit amet',
      'Banner 5',
      'https://nutech-integrasi.app/dummy.jpg',
      'Lerem Ipsum Dolor sit amet',
      'Banner 6',
      'https://nutech-integrasi.app/dummy.jpg',
      'Lerem Ipsum Dolor sit amet',
    ]);

    // Seed services
    const serviceInsertQuery = `
      INSERT INTO services (service_code, service_name, service_icon, service_tariff, "createdAt", "updatedAt")
      VALUES
        ($1, $2, $3, $4, NOW(), NOW()),
        ($5, $6, $7, $8, NOW(), NOW()),
        ($9, $10, $11, $12, NOW(), NOW()),
        ($13, $14, $15, $16, NOW(), NOW()),
        ($17, $18, $19, $20, NOW(), NOW()),
        ($21, $22, $23, $24, NOW(), NOW()),
        ($25, $26, $27, $28, NOW(), NOW()),
        ($29, $30, $31, $32, NOW(), NOW())
      ON CONFLICT (service_code) DO NOTHING
    `;

    await queryRunner.query(serviceInsertQuery, [
      'PAJAK', 'Pajak PBB', 'https://nutech-integrasi.app/dummy.jpg', 40000,
      'PLN_PRABAYAR', 'PLN Prabayar', 'https://nutech-integrasi.app/dummy.jpg', 10000,
      'PLN_PASCA', 'PLN Pascabayar', 'https://nutech-integrasi.app/dummy.jpg', 10000,
      'PULSA', 'Pulsa Indosat', 'https://nutech-integrasi.app/dummy.jpg', 40000,
      'INTERNET', 'Internet', 'https://nutech-integrasi.app/dummy.jpg', 25000,
      'ZAKAT', 'Zakat', 'https://nutech-integrasi.app/dummy.jpg', 300000,
      'ASURANSI', 'Asuransi', 'https://nutech-integrasi.app/dummy.jpg', 50000,
      'PENDIDIKAN', 'Pendidikan', 'https://nutech-integrasi.app/dummy.jpg', 100000,
    ]);

    console.log('Seeding completed successfully!');
    await queryRunner.release();
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

// Run seeding if this file is executed directly
if (require.main === module) {
  AppDataSource.initialize()
    .then(() => seedData())
    .then(() => {
      console.log('Database seeded!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Error during seeding:', error);
      process.exit(1);
    });
}

module.exports = seedData;
