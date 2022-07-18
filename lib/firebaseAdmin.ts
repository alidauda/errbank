import admin from 'firebase-admin';
import * as serviceAccount  from '../shopmakeitfast-firebase-adminsdk-4p4ha-7a61853c61.json';



if (!admin.apps.length) {
  admin.initializeApp({
    credential:admin.credential.cert(JSON.parse(JSON.stringify(serviceAccount))),
 
  });
}

const db = admin.firestore();
const auth = admin.auth();
const storageAd=admin.storage();

export { db, auth,storageAd};