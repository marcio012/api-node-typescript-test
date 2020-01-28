import { Request, Response } from 'express';
import { formatOutput } from '../utils/orderApiUtilFormat';

export const getApi: any = (req: Request, res: Response) => {
  // console.log(req);
  return formatOutput(res, { title: 'Get api Order' }, 200);
};
