const leaveService = require('../src/services/leaveService');

describe('LeaveService business rules', () => {
  test('should auto-approve 1 day leave', () => {
    expect(leaveService.shouldAutoApprove('2025-10-01', '2025-10-01')).toBe(true);
  });
  test('should auto-approve 2 day leave', () => {
    expect(leaveService.shouldAutoApprove('2025-10-01', '2025-10-02')).toBe(true);
  });
  test('should not auto-approve 3 day leave', () => {
    expect(leaveService.shouldAutoApprove('2025-10-01', '2025-10-03')).toBe(false);
  });
});