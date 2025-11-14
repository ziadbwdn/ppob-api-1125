// src/models/Banner.js
const { EntitySchema } = require('typeorm');

const Banner = new EntitySchema({
  name: 'Banner',
  tableName: 'banners',
  columns: {
    id: {
      primary: true,
      type: 'uuid',
      generated: 'uuid',
    },
    banner_name: {
      type: 'varchar',
      length: 255,
    },
    banner_image: {
      type: 'text',
    },
    description: {
      type: 'text',
    },
    createdAt: {
      type: 'timestamp',
      createDate: true,
    },
    updatedAt: {
      type: 'timestamp',
      updateDate: true,
    },
  },
});

module.exports = Banner;
