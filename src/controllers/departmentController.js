const departmentService = require('../services/departmentService');

class DepartmentController {
  async create(req, res) {
    try {
      const { name } = req.body;
      const result = await departmentService.create({ name });
      return res.ok(result);
    } catch (err) {
      return res.error(err.message, 400);
    }
  }

  async listEmployees(req, res) {
    try {
      const id = Number(req.params.id);
      const page = Number(req.query.page || 1);
      const limit = Number(req.query.limit || 20);
      const data = await departmentService.listEmployees(id, page, limit);
      return res.ok({ items: data.rows, total: data.count }, { page, limit });
    } catch (err) {
      return res.error(err.message, 400);
    }
  }
}

module.exports = new DepartmentController();