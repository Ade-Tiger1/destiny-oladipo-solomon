const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const Joi = require('joi');
const { validate } = require('../middlewares/validateRequest');

const createSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  departmentId: Joi.number().optional()
});

router.post('/', validate(createSchema), (req, res) => employeeController.create(req, res));
router.get('/:id', (req, res) => employeeController.get(req, res));

module.exports = router;