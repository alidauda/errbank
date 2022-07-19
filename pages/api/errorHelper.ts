import type { NextApiRequest, NextApiResponse } from "next";
import { PuppeteerHelper } from "../../lib/helper";


export default async function pup(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { code, id, errorName } = req.body;
    //const slicedCode:string =code.slice(0,601)
  await  PuppeteerHelper(code,errorName,id)
    res.status(200).json({ name:  ""});
  } catch (e) {
    res.status(400).json({ name: "falied request error" });
    console.log(e);
  }
}
