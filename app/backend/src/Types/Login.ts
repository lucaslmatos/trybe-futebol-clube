import { JwtPayload } from 'jsonwebtoken';

export type GenericReturn = {
  responseMessage: string | JwtPayload,
  statusCode:number,
};

export type GetRoleReturn = {
  responseMessage: {
    role: string,
  },
  statusCode:number,
};

export type UserLog = {
  email:string,
  password:string,
};
