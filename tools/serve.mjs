#!/usr/bin/env node
/* Static preview, iframe-friendly, local assets only. PORT defaults to 4173. */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';
const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const PORT=Number(process.env.PORT||4173);
const TYPES={'.txt':'text/plain; charset=utf-8','.xml':'application/xml; charset=utf-8','.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.woff2':'font/woff2','.json':'application/json; charset=utf-8','.md':'text/plain; charset=utf-8','.pdf':'application/pdf','.ics':'text/calendar; charset=utf-8','.csv':'text/csv; charset=utf-8','.jpg':'image/jpeg','.jpeg':'image/jpeg','.png':'image/png'};
http.createServer((req,res)=>{
 if(!['GET','HEAD'].includes(req.method)){res.writeHead(405,{'allow':'GET, HEAD'}).end('Method not allowed');return;}
 let pathname;try{pathname=decodeURIComponent((req.url||'/').split('?')[0]);}catch{res.writeHead(400).end('Invalid URL');return;}
 if(pathname.includes('\0')){res.writeHead(400).end('Invalid URL');return;}
 if(pathname.split('/').some(p=>p.startsWith('.')&&p!=='.'&&p!=='..')){res.writeHead(404).end('Not found');return;}
 let file=path.resolve(ROOT,'.'+pathname);
 if(file!==ROOT&&!file.startsWith(ROOT+path.sep)){res.writeHead(403).end('Forbidden');return;}
 try{if(fs.statSync(file).isDirectory())file=path.join(file,'index.html');}catch{}
 fs.readFile(file,(err,buffer)=>{
  if(err){res.writeHead(404,{'content-type':'text/html; charset=utf-8'}).end('<h1>404</h1><p><a href="/">Back to the theme collection</a></p>');return;}
  const ext=path.extname(file),headers={'content-type':TYPES[ext]||'application/octet-stream','x-content-type-options':'nosniff','cache-control':'no-cache','vary':'Accept-Encoding'};
  const gzip=(req.headers['accept-encoding']||'').split(',').some(value=>/^\s*gzip(?:\s*;\s*q=(0(?:\.\d+)?|1(?:\.0+)?))?\s*$/i.test(value)&&(!/q=/.test(value)||Number(value.split('q=')[1])>0));
  if(gzip&&/\.(html|css|js|mjs|svg|json|md|ics|csv|xml|txt)$/.test(ext)){buffer=zlib.gzipSync(buffer);headers['content-encoding']='gzip';}
  headers['content-length']=buffer.length;res.writeHead(200,headers);res.end(req.method==='HEAD'?undefined:buffer);
 });
}).listen(PORT,'0.0.0.0',()=>console.log(`LMS theme collection available on port ${PORT}`));
