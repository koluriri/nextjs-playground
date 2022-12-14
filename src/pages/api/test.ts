import type { NextApiRequest, NextApiResponse } from 'next';
import { ApiReturnSchema } from '~/utils/api-return-schema';

const handler = (
  req: NextApiRequest,
  res: NextApiResponse<ApiReturnSchema>,
) => {
  const { method, headers } = req;

  switch (method) {
    case 'GET':
      // Get data from your database
      res.status(200).json({ name: JSON.stringify(headers.authorization) });
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method ?? 'unknown'} Not Allowed`);
  }
};

export default handler;
