import { Response } from 'express';
import js2xmlparser from 'js2xmlparser';
import { ApplicationType } from '../models/ApplicationType';

export const formatOutput = (res: Response, data: any, statusCode: number, rootElement?: string) => {
  return res.format({
    json: () => {
      res.type(ApplicationType.JSON);
      res.status(statusCode).send(data);
    },
    xml: () => {
      res.type(ApplicationType.XML);
      // @ts-ignore
      res.status(200).send(js2xmlparser.parse(rootElement, data));
    },
    default: () => {
      res.status(406).send();
    },
  });
};
