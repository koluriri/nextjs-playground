import admin from 'firebase-admin';
import serviceAccount from './authenticationtestapp-f0762-firebase-adminsdk-59chq-37a01b69cb.json';

if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: serviceAccount.project_id,
      clientEmail: serviceAccount.client_email,
      privateKey: serviceAccount.private_key,
    }),
  });
}

export default admin;
