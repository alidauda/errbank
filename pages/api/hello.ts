// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { storageAd } from "../../lib/firebaseAdmin";
import { v4 as uuidv4 } from "uuid";
import { auths, firestore } from "../../lib/firebase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const snapshot = await firestore
  .collection('errors')
      .doc(auths.currentUser?.uid)
      .collection('userErrors')
      .get();

const sites = [];

snapshot.forEach((doc) => {
  sites.push({ id: doc.id, ...doc.data() });
});
res.json({id:auths.currentUser?.uid});
}
