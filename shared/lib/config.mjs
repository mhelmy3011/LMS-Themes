/** Build-time presentation preset. No client configuration fetch is required. */
export function profile(theme) {
  const mode = ['academy','creator'].includes(process.env.WA_PRESET) ? process.env.WA_PRESET : theme === 'folio' ? 'creator' : 'academy';
  const rawUrl=(process.env.WA_SITE_URL||'').trim();
  let baseUrl='';
  if(rawUrl){
    let url;try{url=new URL(rawUrl);}catch{throw new Error('WA_SITE_URL must be an absolute http(s) URL.');}
    if(!['http:','https:'].includes(url.protocol)||url.search||url.hash)throw new Error('WA_SITE_URL must be an http(s) URL without a query or fragment.');
    baseUrl=url.href.replace(/\/$/,'');
  }
  return {
    mode,
    recruitment: process.env.WA_RECRUITMENT === '1',
    demo: process.env.WA_STANDALONE !== '1',
    name: process.env.WA_SITE_NAME || 'Web Academy',
    creator: process.env.WA_CREATOR_NAME || 'Ana Torres',
    baseUrl,
  };
}
