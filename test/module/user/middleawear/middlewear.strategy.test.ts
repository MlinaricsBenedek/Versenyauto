import { describe, it, expect, beforeEach, vi, Mock } from 'vitest';
import {  autorization } from '../../../../src/routes/middlewear/middlewear.strategy.js';
import jwt from 'jsonwebtoken';
import { Role } from '../../../../src/dto/enum.js';
import { ForbiddenError } from '../../../../src/error/errors.js';
import { UserReponse } from '../../../../src/dto/user.shema.js';
vi.mock('jsonwebtoken', async (importOriginal) => {
  const actual = await importOriginal<typeof import('jsonwebtoken')>();
  return {
    ...actual,
    default: actual,        
    verify: vi.fn(),        
  };
});


describe('Auth middleware', () => {
const mockVerify = (jwt as unknown as { verify: Mock }).verify;
const mockRequest = (user?: any) => ({ user }) as any;
const mockReply = {} as any;
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe('autorization', () => {
    it('If user has -versenyzo- role and the required role is versennyiranyito',async ()=>{
      const middleware=autorization(Role.versenyiranyito)
      const user:UserReponse = {id:3,name:'testUser',email:'testEmail@gmail.com',role:Role.versenyzo}
      await expect(middleware(mockRequest(user), mockReply)).rejects.toThrow(ForbiddenError)
    })
     it('If user has -versiranyito- role and the required role is versenyzo',async ()=>{
      const middleware=autorization(Role.versenyzo)
      const user:UserReponse = {id:3,name:'testUser',email:'testEmail@gmail.com',role:Role.versenyiranyito}
      await expect(middleware(mockRequest(user), mockReply)).resolves.not.toThrow()
    })
})
});
