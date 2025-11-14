// src/controllers/informationController.js
const informationService = require('../services/informationService');
const { sendSuccess, sendError, statusCodes } = require('../utils/response');

class InformationController {
  async getBanners(req, res, next) {
    try {
      const banners = await informationService.getBanners();
      return sendSuccess(res, 200, 'Sukses', banners);
    } catch (err) {
      next(err);
    }
  }

  async getServices(req, res, next) {
    try {
      const services = await informationService.getServices();
      return sendSuccess(res, 200, 'Sukses', services);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new InformationController();
