import { storage } from 'firebase-admin';
import type { NextApiRequest, NextApiResponse } from 'next'
import puppeteer from 'puppeteer';
import { storageAd } from '../../lib/firebaseAdmin';
export default async function pup(req:NextApiRequest,res:NextApiResponse){
   
   try{ 
    const{code,id} = req.body;
    //const slicedCode:string =code.slice(0,601)
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
  const token=`https://carbon.now.sh/?bg=rgba%28171%2C+184%2C+195%2C+1%29&t=seti&wt=none&l=javascript&width=700&ds=true&dsyoff=20px&dsblur=68px&wc=true&wa=true&pv=56px&ph=56px&ln=false&fl=1&fm=Hack&fs=14px&lh=133%25&si=false&es=2x&wm=false&code=const{code,id} = req.body;
  const slicedCode:string =code.slice(0,601)
  const browser = await puppeteer.launch();
  const page = await browser.newPage();`
    await page.goto(token, {
      waitUntil: "networkidle2",
    });
  const className ="react-codemirror2 CodeMirror__container window-theme__none";
    const rect = await page.evaluate(() => {
      const element = document.querySelector(".CodeMirror__container");
      console.log("this is error",element);
      const {x, y, width, height} = element!.getBoundingClientRect();
      return {left: x, top: y, width, height, id: element!.id};
    }, );
    
  
  const padding =16;
  
  
    await page.screenshot({ path: "test1.png" ,clip: {
      x: rect.left - padding,
      y: rect.top - padding,
      width: rect.width + padding * 2,
      height: rect.height + padding * 2
    }});
    storageAd.bucket().upload
    res.status(200).json({ name: 'John Doe' })
    await browser.close()
   }catch(e){
    res.status(400).json({ name: 'falied request error' })
   }
  
}