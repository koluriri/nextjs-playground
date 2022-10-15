// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { FirebaseError } from 'firebase-admin';
import type { NextApiRequest, NextApiResponse } from 'next';
import admin from 'utils/firebase-admin';

import { regFormSchema } from 'utils/schema-zod';
import { Json } from '~/utils/fetcher';

export type Data = {
  name?: string;
  message?: string;
};

interface NextApiRequestWithBody extends NextApiRequest {
  body: Json;
}

const handler = (req: NextApiRequestWithBody, res: NextApiResponse<Data>) => {
  const { body, method } = req;

  let name = 'POST!';
  const checkRevoked = true;

  switch (method) {
    case 'GET':
      // Get data from your database
      res.status(200).json({ name: 'GET!' });
      break;
    case 'POST':
      try {
        const parsedBody = regFormSchema.parse(body);
        if (parsedBody.token && typeof parsedBody.token === 'string') {
          name = `token`;
          admin
            .auth()
            .verifyIdToken(parsedBody.token, checkRevoked)
            .then((decodedToken) => {
              const { uid } = decodedToken;
              name = `uid:${uid}`;
            })
            .catch((error: FirebaseError) => {
              name = `error!!`;
              if (error?.code && error.code === 'auth/id-token-revoked') {
                // Token has been revoked. Inform the user to reauthenticate or signOut() the user.
              } else {
                // Token is invalid.
              }
            })
            .finally(() => {
              res.status(200).json({ name });
            });
        } else {
          name = `not token`;
        }
      } catch (error) {
        res.status(200).json({ message: 'error' });
      }
      break;
    case 'PUT':
      // Update or create data in your database
      name = JSON.stringify(body);
      res.status(200).json({ name });
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
