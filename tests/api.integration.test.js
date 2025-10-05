const request = require('supertest');
const app = require('../src/app');
const { sequelize } = require('../src/models');

beforeAll(async () => {
  // ensure DB connection
  await sequelize.authenticate();
});

describe('API integration', () => {
  let departmentId;
  let employeeId;

  test('create department', async () => {
    const res = await request(app).post('/api/departments').send({ name: 'Engineering-Test' });
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    departmentId = res.body.data.id;
  });

  test('create employee', async () => {
    const res = await request(app).post('/api/employees').send({ name: 'Test User', email: `test${Date.now()}@example.com`, departmentId });
    expect(res.status).toBe(200);
    employeeId = res.body.data.id;
  });

  test('create leave request and return messageId', async () => {
    const res = await request(app).post('/api/leave-requests').send({ employeeId, startDate: '2025-10-01', endDate: '2025-10-02' });
    expect(res.status).toBe(200);
    expect(res.body.data.messageId).toBeDefined();
  });
});