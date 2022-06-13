import { NextApiRequest, NextApiResponse } from 'next';

import { SCHEMA_TYPE, createResolver } from './validation';

type NextHandler = (err?: Error) => void;

type ValidationHoF = {
  type: SCHEMA_TYPE;
  mode?: 'body' | 'query' | 'headers';
  schema: unknown;
};

export function withValidation({
  type,
  schema,
  mode = 'query',
}: ValidationHoF) {
  return (
    handler?: (req: NextApiRequest, res: NextApiResponse<any>) => any
  ) => {
    return async (
      req: NextApiRequest,
      res: NextApiResponse,
      next?: NextHandler
    ) => {
      try {
        const resolver = createResolver(type, schema);

        resolver.validate(req[mode]);

        if (!!next) {
          return next();
        }

        if (handler) return handler(req, res);

        res.status(404).end();
      } catch (error) {
        process.env.API_VALIDATION ? res.status(400).send(error) : res.status(404).end()
      }
    };
  };
}
