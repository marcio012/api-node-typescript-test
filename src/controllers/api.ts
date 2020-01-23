import { Request, Response } from 'express';
import { formatOutput } from '../utils/orderApiUtilFormat';

export const getApi: any = (req: Request, res: Response) => {
  return formatOutput(res, { title: 'Get api Order' }, 200);
};
