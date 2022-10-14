import type { NextApiRequest, NextApiResponse } from 'next';

export type Data = {
  message?: string;
};

const handler = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      // Get data from your database
      res.status(200).json({ message: 'GET!' });
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method ?? 'unknown'} Not Allowed`);
  }
};

export default handler;
