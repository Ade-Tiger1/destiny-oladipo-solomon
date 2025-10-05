const employeeService = require('../services/employeeService');

class EmployeeController {
  async create(req, res) {
    try {
      const { name, email, departmentId } = req.body;
      const created = await employeeService.create({ name, email, departmentId });
      return res.ok(created);
    } catch (err) {
      return res.error(err.message, 400);
    }
  }

  async get(req, res) {
    try {
      const id = Number(req.params.id);
      const employee = await employeeService.getById(id);
      return res.ok(employee);
    } catch (err) {
      return res.error(err.message, 404);
    }
  }
}

module.exports = new EmployeeController();