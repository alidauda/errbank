import puppeteer from "puppeteer";
import { db, storageAd } from "../lib/firebaseAdmin";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import { serverTimestamp } from "./firebase";
import { Helper } from "./FixHelper";


export async function PuppeteerHelper(code: string,errorName:string,id:string,codeFix:string){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const token = `https://carbon.now.sh/?bg=rgba%28171%2C+184%2C+195%2C+1%29&t=seti&wt=none&l=javascript&width=700&ds=true&dsyoff=20px&dsblur=68px&wc=true&wa=true&pv=56px&ph=56px&ln=false&fl=1&fm=Hack&fs=14px&lh=133%25&si=false&es=2x&wm=false&code=${code}`;
    await page.goto(token, {
      waitUntil: "networkidle2",
    });

    const rect = await page.evaluate(() => {
      const element = document.querySelector(".CodeMirror__container");
      console.log("this is error", element);
      const { x, y, width, height } = element!.getBoundingClientRect();
      return { left: x, top: y, width, height, id: element!.id };
    });

    const padding = 16;
    const imageId = uuidv4();
    const image = `${imageId}.png`;
    const slug=uuidv4();

    await page.screenshot({
      path: image,
      clip: {
        x: rect.left - padding,
        y: rect.top - padding,
        width: rect.width + padding * 2,
        height: rect.height + padding * 2,
      },
    });

 
    await browser.close();
    await storageAd
      .bucket()
      .upload(image, {
        predefinedAcl: "publicRead",
        metadata: { firebaseStorageDownloadTokens: uuidv4() },
      })
      .then((downloadURL) => {
        
        const result = downloadURL[0];
        return result.getMetadata();
      })
      .then((result) => {
        const data = result[0];

        db.collection("errors").doc(id).collection("userErrors").doc(slug).set({
          errorImage: data["mediaLink"],
          "errorName": errorName,
          
          slug
        });
        console.log("metadata = ", data["mediaLink"]);
      });
      Helper(codeFix,id,slug)
      fs.unlinkSync(image);
}