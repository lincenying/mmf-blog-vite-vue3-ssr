if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,a)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(s[r])return;let c={};const o=e=>i(e,r),l={module:{uri:r},exports:c,require:o};s[r]=Promise.all(n.map((e=>l[e]||o(e)))).then((e=>(a(...e),c)))}}define(["./workbox-86adda60"],(function(e){"use strict";e.setCacheNameDetails({prefix:"mmf-blog-vite-vue3-ssr"}),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/404-BIVh3JFz.js",revision:null},{url:"assets/a-input.vue_vue_type_script_setup_true_lang-BxWe9euv.js",revision:null},{url:"assets/back-top-CCX9PjSA.png",revision:null},{url:"assets/backend-admin-list-ChpjXSq3.js",revision:null},{url:"assets/backend-admin-modify-Be1R0wOX.js",revision:null},{url:"assets/backend-article-comment-Crwg2vav.js",revision:null},{url:"assets/backend-article-insert-CaiqG3I4.js",revision:null},{url:"assets/backend-article-list-1oQyfcFp.js",revision:null},{url:"assets/backend-article-modify-DQ579lda.js",revision:null},{url:"assets/backend-category-insert-BMNt1Zph.js",revision:null},{url:"assets/backend-category-list-8k8mUmiM.js",revision:null},{url:"assets/backend-category-modify-7BRmbdmN.js",revision:null},{url:"assets/backend-index-Baq-EtNb.js",revision:null},{url:"assets/backend-login-DY2dMD8W.js",revision:null},{url:"assets/backend-user-list-CBL9uy5g.js",revision:null},{url:"assets/backend-user-modify-BGplUcAl.js",revision:null},{url:"assets/circle-loading-eEF3_9-q.png",revision:null},{url:"assets/frontend-about-DmvTrySV.js",revision:null},{url:"assets/frontend-article-BMXo76NW.js",revision:null},{url:"assets/frontend-index-YlpSBuAi.js",revision:null},{url:"assets/frontend-user-account-_pkoB4Ss.js",revision:null},{url:"assets/frontend-user-DIsn9XdR.js",revision:null},{url:"assets/frontend-user-password-A5bzTTYu.js",revision:null},{url:"assets/item-actions.vue_vue_type_script_setup_true_lang-C4gOOdAV.js",revision:null},{url:"assets/main-BRNkx1Rh.css",revision:null},{url:"assets/main-Bv-ZqgeW.js",revision:null},{url:"assets/nav-logo-Cqt_j--w.png",revision:null},{url:"assets/nav-logo-PqxD-t7E.png",revision:null},{url:"assets/unocss-CUgZewU3.css",revision:null},{url:"assets/upload-api-B8RxlIE4.js",revision:null},{url:"assets/use-backend-admin-store-C9q-hF0y.js",revision:null},{url:"assets/use-backend-article-store-Cxe_NP5V.js",revision:null},{url:"assets/use-backend-user-store-QSrJOhV7.js",revision:null},{url:"assets/use-frontend-article-store-CY49C_lP.js",revision:null},{url:"assets/use-global-category-store-DvT7TdiO.js",revision:null},{url:"assets/use-global-comment-store-1KkG4N2M.js",revision:null},{url:"assets/vendor-DKdHTvZr.js",revision:null},{url:"assets/vendor-DPD6zcSa.css",revision:null},{url:"favicon.ico",revision:"be97e36f018b6660b1e55172949e49b5"},{url:"robots.txt",revision:"9be51bc77d1946a265bc5b63f4394859"},{url:"static/images/avatar.png",revision:"2b02841e980a26eec00f3587b5661880"},{url:"static/images/topic-1.png",revision:"4cb37ea61ecb0ea8baf686c9675f8bcf"},{url:"static/img/icons/android-chrome-168x168.png",revision:"82729ed64d22b79b3d9ba65fa70a4ed3"},{url:"static/img/icons/android-chrome-192x192.png",revision:"8a739eaeec140421a7fce64795e0397f"},{url:"static/img/icons/android-chrome-48x48.png",revision:"c14b70149a86584c3f3cde164993bc4e"},{url:"static/img/icons/android-chrome-512x512.png",revision:"45e89482c67c6888230a9aede75077c1"},{url:"static/img/icons/android-chrome-72x72.png",revision:"77ae66659c78aeb096a5b5107863a69c"},{url:"static/img/icons/android-chrome-96x96.png",revision:"35eef8661696086e1ac6dac1c8353761"},{url:"static/img/icons/android-chrome-maskable-192x192.png",revision:"8a739eaeec140421a7fce64795e0397f"},{url:"static/img/icons/android-chrome-maskable-512x512.png",revision:"45e89482c67c6888230a9aede75077c1"},{url:"static/img/icons/apple-touch-icon-120x120.png",revision:"ae61b05e450ea7de54538294ae61861b"},{url:"static/img/icons/apple-touch-icon-152x152.png",revision:"3f4695a18dbc835725197ef9ae2239da"},{url:"static/img/icons/apple-touch-icon-180x180.png",revision:"42d7d8b9497af271a3873881a509eb12"},{url:"static/img/icons/apple-touch-icon-60x60.png",revision:"2d2820d90f2f986328294b3a8f7ea293"},{url:"static/img/icons/apple-touch-icon-76x76.png",revision:"ade4c11fefea35c0c853b5dabcfabbf0"},{url:"static/img/icons/favicon-16x16.png",revision:"2a07e5c6cafbce3893509ff068eb48c5"},{url:"static/img/icons/favicon-32x32.png",revision:"9fc2dd2964bac8566817776e568da8a2"},{url:"static/img/icons/favicon.ico",revision:"be97e36f018b6660b1e55172949e49b5"},{url:"static/img/icons/msapplication-icon-144x144.png",revision:"2a56e6fe7e8de812b433a01d324e3b5f"},{url:"static/img/icons/safari-pinned-tab.svg",revision:"788fcfcbce8fe2c3440f696846e9ab69"},{url:"static/js/polyfill.js",revision:"8e937cf15d37b117998fe2ff6801beda"},{url:"static/img/icons/android-chrome-168x168.png",revision:"82729ed64d22b79b3d9ba65fa70a4ed3"},{url:"static/img/icons/android-chrome-192x192.png",revision:"8a739eaeec140421a7fce64795e0397f"},{url:"static/img/icons/android-chrome-48x48.png",revision:"c14b70149a86584c3f3cde164993bc4e"},{url:"static/img/icons/android-chrome-512x512.png",revision:"45e89482c67c6888230a9aede75077c1"},{url:"static/img/icons/android-chrome-72x72.png",revision:"77ae66659c78aeb096a5b5107863a69c"},{url:"static/img/icons/android-chrome-96x96.png",revision:"35eef8661696086e1ac6dac1c8353761"},{url:"static/img/icons/msapplication-icon-144x144.png",revision:"2a56e6fe7e8de812b433a01d324e3b5f"},{url:"manifest.webmanifest",revision:"ddd2ef6bbcc63845a85d083785ca4307"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(/^https:\/\/(cdn|fastly)\.jsdelivr\.net\/.*/i,new e.CacheFirst({cacheName:"jsdelivr-cache",plugins:[new e.CacheableResponsePlugin({statuses:[0,200]}),new e.ExpirationPlugin({maxEntries:10,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/cravatar\.cn\/.*/i,new e.CacheFirst({cacheName:"avatar-cache",plugins:[new e.CacheableResponsePlugin({statuses:[0,200]}),new e.ExpirationPlugin({maxEntries:10,maxAgeSeconds:31536e3})]}),"GET")}));
