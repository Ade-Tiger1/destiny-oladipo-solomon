const employeeRepo = require('../repositories/employeeRepository');
const departmentRepo = require('../repositories/departmentRepository');

class EmployeeService {
  async create({ name, email, departmentId }) {
    if (departmentId) {
      const dep = await departmentRepo.findById(departmentId);
      if (!dep) throw new Error('Department not found');
    }
    const exists = await employeeRepo.findByEmail(email);
    if (exists) throw new Error('Email already exists');
    return employeeRepo.create({ name, email, departmentId });
  }


  async getById(id) {
    const employee = await employeeRepo.findById(id);
    if (!employee) throw new Error('Employee not found');
    return employee;
  }
}

module.exports = new EmployeeService();