// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string;
};

const handler = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      // Get data from your database
      res.status(200).json({ name: 'GET!' });
      break;
    case 'POST':
      // Update or create data in your database
      res.status(200).json({ name: 'POST!' });
      break;
    case 'PUT':
      // Update or create data in your database
      res.status(200).json({ name: 'PUT!' });
      break;
    case 'DELETE':
      // Update or create data in your database
      res.status(200).json({ name: 'DELETE!' });
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'POST', 'DELETE']);
      res.status(405).end(`Method ${method ?? 'unknown'} Not Allowed`);
  }
};

export default handler;
