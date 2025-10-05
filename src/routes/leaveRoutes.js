const express = require('express');
const router = express.Router();
const leaveController = require('../controllers/leaveController');
const Joi = require('joi');
const { validate } = require('../middlewares/validateRequest');

const createSchema = Joi.object({
  employeeId: Joi.number().required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().required()
});

router.post('/', validate(createSchema), (req, res) => leaveController.create(req, res));

module.exports = router;