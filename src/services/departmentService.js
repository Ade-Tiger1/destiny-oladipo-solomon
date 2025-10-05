const departmentRepo = require('../repositories/departmentRepository');

class DepartmentService {
  async create(data) { return departmentRepo.create(data); }
  async listEmployees(departmentId, page = 1, limit = 20) {
    const offset = (page - 1) * limit;
    return departmentRepo.findEmployeesPaginated(departmentId, { limit, offset });
  }
}

module.exports = new DepartmentService();