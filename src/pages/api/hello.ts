// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import admin from '~/utils/firebase-admin';

type Data = {
  name: string;
};

const handler = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { query, method } = req;

  let name = 'POST!';

  switch (method) {
    case 'GET':
      // Get data from your database
      res.status(200).json({ name: 'GET!' });
      break;
    case 'POST':
      // Update or create data in your database
      if (query.token && typeof query.token === 'string') {
        name = `token`;
        admin
          .auth()
          .verifyIdToken(query.token)
          .then((decodedToken) => {
            const { uid } = decodedToken;
            name = `uid:${uid}`;
          })
          .catch((error) => {
            name = `error!!`;
            console.error(error);
          })
          .finally(() => {
            res.status(200).json({ name });
          });
      } else {
        name = `not token`;
      }
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
