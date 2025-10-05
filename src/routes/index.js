const express = require('express');
const router = express.Router();
const departmentRoutes = require('./departmentRoutes');
const employeeRoutes = require('./employeeRoutes');
const leaveRoutes = require('./leaveRoutes');

router.use('/departments', departmentRoutes);
router.use('/employees', employeeRoutes);
router.use('/leave-requests', leaveRoutes);

module.exports = router;