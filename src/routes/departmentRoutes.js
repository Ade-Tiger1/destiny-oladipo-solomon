const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');
const Joi = require('joi');
const { validate } = require('../middlewares/validateRequest');

const createSchema = Joi.object({ name: Joi.string().min(1).required() });

router.post('/', validate(createSchema), (req, res) => departmentController.create(req, res));
router.get('/:id/employees', (req, res) => departmentController.listEmployees(req, res));

module.exports = router;