const { Department, Employee } = require('../models');

class DepartmentRepository {
  async create(data) { return Department.create(data); }

  async findById(id) { return Department.findByPk(id); }

  async findEmployeesPaginated(departmentId, { limit, offset }) {
    return Employee.findAndCountAll({
      where: { departmentId },
      limit,
      offset,
      order: [['id', 'ASC']]
    });
}
}

module.exports = new DepartmentRepository();