if(!self.define){let e,i={};const n=(n,s)=>(n=new URL(n+".js",s).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(s,r)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(i[o])return;let t={};const c=e=>n(e,o),d={module:{uri:o},exports:t,require:c};i[o]=Promise.all(s.map((e=>d[e]||c(e)))).then((e=>(r(...e),t)))}}define(["./workbox-3e911b1d"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-1ps2IcpF.css",revision:null},{url:"assets/index-Dc3jdS0Q.js",revision:null},{url:"index.html",revision:"8a756258c927f2086bfdf5604a6931bd"},{url:"registerSW.js",revision:"d9c01455953b9d85fffde480f62b2335"},{url:"apple-touch-icon.png",revision:"ecb3d305ab6a32286a1db19977bc4461"},{url:"favicon.ico",revision:"5c15134993885f5a0d2b7a6e595a054c"},{url:"pwa-192x192.png",revision:"3be011729b7dbf2c70f8d973dfa0740e"},{url:"pwa-512x512.png",revision:"9bd11d4e2270abb46d4378f352b59225"},{url:"pwa-maskable-192x192.png",revision:"b17aaa64d5714c9cbf06467977f90ef2"},{url:"pwa-maskable-512x512.png",revision:"90759b0d3c99995ebe6c26b18767f99e"},{url:"manifest.webmanifest",revision:"6a0b2bf917752722757e4faab0f4573c"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
