jest.mock('../services', () => {
  return {
    userRoleService: {
      assignRoleToUser: jest.fn(),
      getUserRoles: jest.fn(),
      removeRoleFromUser: jest.fn(),
      getAllUserRoles: jest.fn()
    }
  };
});
const { userRoleController } = require('../controllers')
const { assignRoleToUser, getUserRoles, removeRoleFromUser, getAllUserRoles } = userRoleController 
const { userRoleService } = require('../services');

describe('userRoleController', () => {
  let req;
  let res;
  let statusMock;
  let jsonMock;

  beforeEach(() => {
   
    jest.clearAllMocks();

    
    jsonMock = jest.fn();
    statusMock = jest.fn(() => ({ json: jsonMock }));

    res = {
      status: statusMock
    };

    req = {
      body: {},
      params: {}
    };

  });

  describe('assignRoleToUser', () => {
    test('should respond 201 with data when service returns success', async () => {
      const mockResult = { success: true, message: 'Role assigned', data: { id: 1 } };
      userRoleService.assignRoleToUser.mockResolvedValue(mockResult);

      req.body = { userId: 1, roleId: 2 };

      await assignRoleToUser(req, res);

      expect(userRoleService.assignRoleToUser).toHaveBeenCalledWith(req.body);
      expect(statusMock).toHaveBeenCalledWith(201);
      expect(jsonMock).toHaveBeenCalledWith({
        success: true,
        message: mockResult.message,
        data: mockResult.data
      });
    });

    test('should respond 400 when service returns success: false', async () => {
      const mockResult = { success: false, message: 'Invalid payload' };
      userRoleService.assignRoleToUser.mockResolvedValue(mockResult);

      req.body = { bad: 'payload' };

      await assignRoleToUser(req, res);

      expect(userRoleService.assignRoleToUser).toHaveBeenCalledWith(req.body);
      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({
        success: false,
        message: mockResult.message
      });
    });

    test('should respond 500 when service throws', async () => {
      const error = new Error('DB down');
      userRoleService.assignRoleToUser.mockRejectedValue(error);

      req.body = { userId: 1, roleId: 2 };

      await assignRoleToUser(req, res);

      expect(userRoleService.assignRoleToUser).toHaveBeenCalledWith(req.body);
      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({
        success: false,
        message: error.message
      });
    });
  });

  describe('getUserRoles', () => {
    test('should respond 200 with data on success', async () => {
      const mockResult = { success: true,data: [{ role: 'admin' }] };
      userRoleService.getUserRoles.mockResolvedValue(mockResult);

      req.params.userId = '123';

      await getUserRoles(req, res);

      expect(userRoleService.getUserRoles).toHaveBeenCalledWith('123');
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith({
        success: true,
        data: mockResult.data
      });
    });

    test('should respond 500 when service throws', async () => {
      const error = new Error('some error');
      userRoleService.getUserRoles.mockRejectedValue(error);

      req.params.userId = '123';

      await getUserRoles(req, res);

      expect(userRoleService.getUserRoles).toHaveBeenCalledWith('123');
      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({
        success: false,
        message: error.message
      });
    });
  });

  describe('removeRoleFromUser', () => {
    test('should respond 200 when role removed (success true)', async () => {
      const mockResult = { success: true, message: 'Role removed' };
      userRoleService.removeRoleFromUser.mockResolvedValue(mockResult);

      req.params.id = 'role-1';

      await removeRoleFromUser(req, res);

      expect(userRoleService.removeRoleFromUser).toHaveBeenCalledWith('role-1');
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith({
        success: true,
        message: mockResult.message
      });
    });

    test('should respond 404 when service returns success: false', async () => {
      const mockResult = { success: false, message: 'Role not found' };
      userRoleService.removeRoleFromUser.mockResolvedValue(mockResult);

      req.params.id = 'unknown';

      await removeRoleFromUser(req, res);

      expect(userRoleService.removeRoleFromUser).toHaveBeenCalledWith('unknown');
      expect(statusMock).toHaveBeenCalledWith(404);
      expect(jsonMock).toHaveBeenCalledWith({
        success: false,
        message: mockResult.message
      });
    });

    test('should respond 500 when service throws', async () => {
      const error = new Error('DB error');
      userRoleService.removeRoleFromUser.mockRejectedValue(error);

      req.params.id = 'role-1';

      await removeRoleFromUser(req, res);

      expect(userRoleService.removeRoleFromUser).toHaveBeenCalledWith('role-1');
      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({
        success: false,
        message: error.message
      });
    });
  });

  describe('getAllUserRoles', () => {
    test('should respond 200 with data on success', async () => {
      const mockResult = { success: true,data: [{ id: 1, name: 'admin' }] };
      userRoleService.getAllUserRoles.mockResolvedValue(mockResult);

      await getAllUserRoles(req, res);

      expect(userRoleService.getAllUserRoles).toHaveBeenCalled();
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith({
        success: true,
        data: mockResult.data
      });
    });

    test('should respond 500 when service throws', async () => {
      const error = new Error('unexpected');
      userRoleService.getAllUserRoles.mockRejectedValue(error);

      await getAllUserRoles(req, res);

      expect(userRoleService.getAllUserRoles).toHaveBeenCalled();
      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({
        success: false,
        message: error.message
      });
    });
  });
});