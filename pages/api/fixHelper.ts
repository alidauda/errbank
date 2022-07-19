import { NextApiRequest, NextApiResponse } from "next";
import { Helper } from "../../lib/FixHelper";


export default async function pup(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { codeFix, id } = req.body;
      //const slicedCode:string =code.slice(0,601)
      Helper(codeFix,id)
      res.status(200).json({ name:  ""});
    } catch (e) {
      res.status(400).json({ name: "falied request error" });
      console.log(e);
    }
  }
  