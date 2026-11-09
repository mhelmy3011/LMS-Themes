/** Optional QA dependencies only; never imported by build or browser bundles. */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath,pathToFileURL } from 'node:url';
export const ROOT=fileURLToPath(new URL('../',import.meta.url));
export async function browserKit(){
 const candidates=[process.env.WA_BROWSER_PACKAGES,path.join(ROOT,'.cache/qa/node_modules'),path.join(ROOT,'.cache/ui-audit/node_modules'),path.join(ROOT,'node_modules')].filter(Boolean);
 let modules;for(const p of candidates){try{await fs.access(path.join(p,'playwright-core/index.mjs'));modules=p;break;}catch{}}
 if(!modules)throw new Error('Optional browser tools are not installed. See README.md: npm install --prefix .cache/qa --no-save --no-package-lock playwright-core@1.64.1 @sparticuz/chromium@153.0.0 @axe-core/playwright@4.14.0');
 const load=p=>import(pathToFileURL(path.join(modules,p)).href);
 const {chromium:playwright}=await load('playwright-core/index.mjs');
 const {default:AxeBuilder}=await load('@axe-core/playwright/dist/index.mjs');
 let options={headless:true};
 if(process.env.CHROMIUM_EXECUTABLE_PATH)options={...options,executablePath:process.env.CHROMIUM_EXECUTABLE_PATH,args:['--no-sandbox','--disable-dev-shm-usage']};
 else{
  const {default:chromium}=await load('@sparticuz/chromium/build/index.js');
  // Debian sandboxes need the bundled Amazon Linux compatibility libraries.
  const {inflate}=await load('@sparticuz/chromium/build/lambdafs.js');
  await inflate(path.join(modules,'@sparticuz/chromium/bin/al2023.tar.br'));
  options={...options,executablePath:await chromium.executablePath(),args:chromium.args,env:{...process.env,LD_LIBRARY_PATH:['/tmp/al2023/lib',process.env.LD_LIBRARY_PATH].filter(Boolean).join(':')}};
 }
 return {browser:await playwright.launch(options),AxeBuilder};
}
