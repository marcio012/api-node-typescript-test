import { Response } from 'express';
import { ApplicationType } from '../models/ApplicationType';

export const formatOutput = (res: Response, data: any, statusCode: number, applicationType: ApplicationType) => {
  return res.format({
    json: () => {
      res.type(applicationType);
      res.status(statusCode).send(data);
    },
    default: () => {
      res.status(406).send();
    },
  });
};
