import { describe, it, expect, beforeEach, vi, Mock } from 'vitest';
import { authenticate, autorization } from '../../../../src/module/user/middlewear/middlewear.strategy.js';
import jwt from 'jsonwebtoken';
import { Role } from '../../../../src/helper/enum.js';
import { UnathorizedError, ForbiddenError } from '../../../../src/error/errors.js';

vi.mock('jsonwebtoken', async (importOriginal) => {
  const actual = await importOriginal<typeof import('jsonwebtoken')>();
  return {
    ...actual,
    default: actual,        
    verify: vi.fn(),        
  };
});

const mockVerify = (jwt as unknown as { verify: Mock }).verify;

describe('Auth middleware', () => {

  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe('authenticate', () => {
    it('if access token is missing it should thorw unathorized error', async () => {
      const mockRequest: any = { headers: {} };
      const mockReply: any = {};

      await expect(authenticate(mockRequest, mockReply)).rejects.toThrow(UnathorizedError);
    });

    it('throw Forbidden error if token is invalid', async () => {
      mockVerify.mockImplementation(() => { throw new Error('invalid'); });
      const mockRequest: any = { headers: { authorization: 'Bearer faketoken' } };
      const mockReply: any = {};
      await expect(authenticate(mockRequest, mockReply)).rejects.toThrow(ForbiddenError);
    });
  });

  describe('autorization', () => {
    it('access if user has any role', async () => {
      const mockRequest: any = { role: Role.versenyzo.toString() };
      const mockReply: any = {};
      const middleware = autorization(Role.versenyzo);
      await expect(middleware(mockRequest, mockReply)).resolves.toBeUndefined();
    });

    it('should throw forbidden if user role is versenyzo', async () => {
      const mockRequest: any = { role: Role.versenyzo.toString() };
      const mockReply: any = {};
      const middleware = autorization(Role.versenyiranyito);
      await expect(middleware(mockRequest, mockReply)).rejects.toThrow(ForbiddenError);
    });
  });

});
