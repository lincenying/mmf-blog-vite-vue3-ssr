if(!self.define){let s,e={};const n=(n,i)=>(n=new URL(n+".js",i).href,e[n]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=n,s.onload=e,document.head.appendChild(s)}else s=n,importScripts(n),e()})).then((()=>{let s=e[n];if(!s)throw new Error(`Module ${n} didn’t register its module`);return s})));self.define=(i,r)=>{const l=s||("document"in self?document.currentScript.src:"")||location.href;if(e[l])return;let o={};const t=s=>n(s,l),a={module:{uri:l},exports:o,require:t};e[l]=Promise.all(i.map((s=>a[s]||t(s)))).then((s=>(r(...s),o)))}}define(["./workbox-968b9928"],(function(s){"use strict";s.setCacheNameDetails({prefix:"mmf-blog-vite-vue3-ssr"}),self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"assets/404-g9H44hcv.js",revision:null},{url:"assets/a-input.vue_vue_type_script_setup_true_lang-Lood7UXw.js",revision:null},{url:"assets/backend-admin-list-v7ayIhaP.js",revision:null},{url:"assets/backend-admin-modify-xT_iMWnz.js",revision:null},{url:"assets/backend-article-comment-xuyUr0cE.js",revision:null},{url:"assets/backend-article-insert-V7cDqkiS.js",revision:null},{url:"assets/backend-article-list-sRXx1yo5.js",revision:null},{url:"assets/backend-article-modify-yE4_0fQu.js",revision:null},{url:"assets/backend-category-insert-HwvMRT5n.js",revision:null},{url:"assets/backend-category-list-seG1h4Xf.js",revision:null},{url:"assets/backend-category-modify-YdpTr1q9.js",revision:null},{url:"assets/backend-index--xDYinnx.js",revision:null},{url:"assets/backend-login-RgSnEXMC.js",revision:null},{url:"assets/backend-user-list-H1SqLyoZ.js",revision:null},{url:"assets/backend-user-modify-jpsUwzei.js",revision:null},{url:"assets/frontend-about-89cPgK4x.js",revision:null},{url:"assets/frontend-article-JitGzD-w.js",revision:null},{url:"assets/frontend-index-i1RIUXA_.js",revision:null},{url:"assets/frontend-user-account-KMIF9ZZw.js",revision:null},{url:"assets/frontend-user-Kxrtf7fc.js",revision:null},{url:"assets/frontend-user-password-JnK6lVTA.js",revision:null},{url:"assets/main-qGAp7FK8.js",revision:null},{url:"assets/main-VbldRns5.css",revision:null},{url:"assets/upload-api-uVvbjo2i.js",revision:null},{url:"assets/use-backend-admin-store-H5AkFlhg.js",revision:null},{url:"assets/use-backend-article-store-kEB33g5h.js",revision:null},{url:"assets/use-backend-user-store-CLS38jQN.js",revision:null},{url:"assets/use-frontend-article-store-2QUUcx-j.js",revision:null},{url:"assets/use-global-category-store-6ocZNVW0.js",revision:null},{url:"assets/use-global-comment-store-bSF_C78Z.js",revision:null},{url:"assets/vue-content-loader.es-wojvIAYL.js",revision:null},{url:"assets/vue.f36acd1f-sXxLdG6h.js",revision:null},{url:"assets/workbox-window.prod.es5-zUWdUQO_.js",revision:null},{url:"static/js/polyfill.js",revision:"8e937cf15d37b117998fe2ff6801beda"},{url:"static/img/icons/android-chrome-48x48.png",revision:"c14b70149a86584c3f3cde164993bc4e"},{url:"static/img/icons/android-chrome-72x72.png",revision:"77ae66659c78aeb096a5b5107863a69c"},{url:"static/img/icons/android-chrome-96x96.png",revision:"35eef8661696086e1ac6dac1c8353761"},{url:"static/img/icons/msapplication-icon-144x144.png",revision:"2a56e6fe7e8de812b433a01d324e3b5f"},{url:"static/img/icons/android-chrome-168x168.png",revision:"82729ed64d22b79b3d9ba65fa70a4ed3"},{url:"static/img/icons/android-chrome-192x192.png",revision:"8a739eaeec140421a7fce64795e0397f"},{url:"static/img/icons/android-chrome-512x512.png",revision:"45e89482c67c6888230a9aede75077c1"},{url:"manifest.webmanifest",revision:"ddd2ef6bbcc63845a85d083785ca4307"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(/api\/.*/i,new s.CacheFirst({cacheName:"api-cache",plugins:[new s.CacheableResponsePlugin({statuses:[0,200]})]}),"GET"),s.registerRoute(/^https:\/\/cdn\.jsdelivr\.net\/.*/i,new s.CacheFirst({cacheName:"cdn-cache",plugins:[new s.CacheableResponsePlugin({statuses:[0,200]})]}),"GET")}));
