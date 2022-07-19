// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { storageAd } from "../../lib/firebaseAdmin";
import { v4 as uuidv4 } from "uuid";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
 await storageAd
      .bucket()
      .upload("./img.png", {
        predefinedAcl:'publicRead',
        metadata: { firebaseStorageDownloadTokens: uuidv4() },
      })
      .then((downloadURL) => {
        const result = downloadURL[0]
        return result.getMetadata()
      }).then(result => {
        const data=result[0]
        console.log("metadata = ", data)
      });
      res.status(200).json({ data:"success",})
  } catch (err) {
    console.log(err);
    res.status(400).json({ data:"falied",})
    
  }
}
