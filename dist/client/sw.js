if(!self.define){let s,e={};const n=(n,i)=>(n=new URL(n+".js",i).href,e[n]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=n,s.onload=e,document.head.appendChild(s)}else s=n,importScripts(n),e()})).then((()=>{let s=e[n];if(!s)throw new Error(`Module ${n} didn’t register its module`);return s})));self.define=(i,r)=>{const a=s||("document"in self?document.currentScript.src:"")||location.href;if(e[a])return;let l={};const t=s=>n(s,a),o={module:{uri:a},exports:l,require:t};e[a]=Promise.all(i.map((s=>o[s]||t(s)))).then((s=>(r(...s),l)))}}define(["./workbox-8775d50a"],(function(s){"use strict";s.setCacheNameDetails({prefix:"mmf-blog-vite-vue3-ssr"}),self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"assets/404-09a37e95.js",revision:null},{url:"assets/a-input.vue_vue_type_script_setup_true_lang-a2cc3c66.js",revision:null},{url:"assets/backend-admin-list-01f5b34a.js",revision:null},{url:"assets/backend-admin-modify-c7baf7da.js",revision:null},{url:"assets/backend-article-comment-8bc88046.js",revision:null},{url:"assets/backend-article-insert-f53341da.js",revision:null},{url:"assets/backend-article-list-62547457.js",revision:null},{url:"assets/backend-article-modify-56085da7.js",revision:null},{url:"assets/backend-category-insert-5523aa2f.js",revision:null},{url:"assets/backend-category-list-c5cb7c5a.js",revision:null},{url:"assets/backend-category-modify-4bf77f79.js",revision:null},{url:"assets/backend-index-70fbe65a.js",revision:null},{url:"assets/backend-login-02408fe8.js",revision:null},{url:"assets/backend-user-list-c2e29355.js",revision:null},{url:"assets/backend-user-modify-30c4b622.js",revision:null},{url:"assets/frontend-about-7b4372e8.js",revision:null},{url:"assets/frontend-article-3116df7a.js",revision:null},{url:"assets/frontend-index-deb6b262.js",revision:null},{url:"assets/frontend-user-70d79a4a.js",revision:null},{url:"assets/frontend-user-account-6ac0d72a.js",revision:null},{url:"assets/frontend-user-password-e735a217.js",revision:null},{url:"assets/index-f684622e.css",revision:null},{url:"assets/main-605b9724.js",revision:null},{url:"assets/upload-api-acac9f68.js",revision:null},{url:"assets/use-backend-admin-store-1a5136b7.js",revision:null},{url:"assets/use-backend-article-store-5d84ae8f.js",revision:null},{url:"assets/use-backend-user-store-3f086a78.js",revision:null},{url:"assets/use-frontend-article-store-b7c2ce89.js",revision:null},{url:"assets/use-global-category-store-056bf978.js",revision:null},{url:"assets/use-global-comment-store-90467915.js",revision:null},{url:"assets/vue-content-loader.es-4df91236.js",revision:null},{url:"assets/workbox-window.prod.es5-799c7be9.js",revision:null},{url:"static/js/polyfill.js",revision:"bb39c01ef396ba75fcb301c4b9b18a3a"},{url:"static/img/icons/android-chrome-48x48.png",revision:"c14b70149a86584c3f3cde164993bc4e"},{url:"static/img/icons/android-chrome-72x72.png",revision:"77ae66659c78aeb096a5b5107863a69c"},{url:"static/img/icons/android-chrome-96x96.png",revision:"35eef8661696086e1ac6dac1c8353761"},{url:"static/img/icons/msapplication-icon-144x144.png",revision:"2a56e6fe7e8de812b433a01d324e3b5f"},{url:"static/img/icons/android-chrome-168x168.png",revision:"82729ed64d22b79b3d9ba65fa70a4ed3"},{url:"static/img/icons/android-chrome-192x192.png",revision:"8a739eaeec140421a7fce64795e0397f"},{url:"static/img/icons/android-chrome-512x512.png",revision:"45e89482c67c6888230a9aede75077c1"},{url:"manifest.webmanifest",revision:"ddd2ef6bbcc63845a85d083785ca4307"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(/api\/.*/i,new s.CacheFirst({cacheName:"api-cache",plugins:[new s.CacheableResponsePlugin({statuses:[0,200]})]}),"GET"),s.registerRoute(/^https:\/\/cdn\.jsdelivr\.net\/.*/i,new s.CacheFirst({cacheName:"cdn-cache",plugins:[new s.CacheableResponsePlugin({statuses:[0,200]})]}),"GET")}));
