if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,a)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(s[r])return;let c={};const o=e=>i(e,r),l={module:{uri:r},exports:c,require:o};s[r]=Promise.all(n.map((e=>l[e]||o(e)))).then((e=>(a(...e),c)))}}define(["./workbox-b5f9716b"],(function(e){"use strict";e.setCacheNameDetails({prefix:"mmf-blog-vite-vue3-ssr"}),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/404-BPUnlVr-.js",revision:null},{url:"assets/a-input.vue_vue_type_script_setup_true_lang-Dt9kI8oc.js",revision:null},{url:"assets/back-top-CCX9PjSA.png",revision:null},{url:"assets/backend-admin-list-BwSbz3ai.js",revision:null},{url:"assets/backend-admin-modify-rKquQkzm.js",revision:null},{url:"assets/backend-article-comment-CegxPufu.js",revision:null},{url:"assets/backend-article-insert-BF5Ni4Ce.js",revision:null},{url:"assets/backend-article-list-CaBbA7nk.js",revision:null},{url:"assets/backend-article-modify-r53wPhDH.js",revision:null},{url:"assets/backend-category-insert-CY9VaxIP.js",revision:null},{url:"assets/backend-category-list-shYb1p1m.js",revision:null},{url:"assets/backend-category-modify-DAhyeOLx.js",revision:null},{url:"assets/backend-index-B1s_fD1T.js",revision:null},{url:"assets/backend-login-CEyvNpCZ.js",revision:null},{url:"assets/backend-user-list-tZfff5Wc.js",revision:null},{url:"assets/backend-user-modify-Bw7bm7_G.js",revision:null},{url:"assets/circle-loading-eEF3_9-q.png",revision:null},{url:"assets/frontend-about-DfXCIjIA.js",revision:null},{url:"assets/frontend-article-DuNdvg3a.js",revision:null},{url:"assets/frontend-index-M5I7VctV.js",revision:null},{url:"assets/frontend-user-account-BBR2kVf3.js",revision:null},{url:"assets/frontend-user-CDr_9uYI.js",revision:null},{url:"assets/frontend-user-password-CVDE2DmB.js",revision:null},{url:"assets/main-DGy2Cj_t.js",revision:null},{url:"assets/main-pxVFW8s1.css",revision:null},{url:"assets/nav-logo-Cqt_j--w.png",revision:null},{url:"assets/nav-logo-PqxD-t7E.png",revision:null},{url:"assets/upload-api-B8RxlIE4.js",revision:null},{url:"assets/use-backend-admin-store-6t9apzm4.js",revision:null},{url:"assets/use-backend-article-store-CTnCKvEc.js",revision:null},{url:"assets/use-backend-user-store-B13jbBcA.js",revision:null},{url:"assets/use-frontend-article-store-DINwTYfq.js",revision:null},{url:"assets/use-global-category-store-C4UjAvZ8.js",revision:null},{url:"assets/use-global-comment-store-BEnMzjFi.js",revision:null},{url:"assets/vue-content-loader.es-BLAhCCaG.js",revision:null},{url:"assets/vue.f36acd1f-BjAWAwNV.js",revision:null},{url:"assets/workbox-window.prod.es5-WEjqEGHc.js",revision:null},{url:"favicon.ico",revision:"be97e36f018b6660b1e55172949e49b5"},{url:"robots.txt",revision:"9be51bc77d1946a265bc5b63f4394859"},{url:"static/images/avatar.png",revision:"2b02841e980a26eec00f3587b5661880"},{url:"static/images/topic-1.png",revision:"4cb37ea61ecb0ea8baf686c9675f8bcf"},{url:"static/img/icons/android-chrome-168x168.png",revision:"82729ed64d22b79b3d9ba65fa70a4ed3"},{url:"static/img/icons/android-chrome-192x192.png",revision:"8a739eaeec140421a7fce64795e0397f"},{url:"static/img/icons/android-chrome-48x48.png",revision:"c14b70149a86584c3f3cde164993bc4e"},{url:"static/img/icons/android-chrome-512x512.png",revision:"45e89482c67c6888230a9aede75077c1"},{url:"static/img/icons/android-chrome-72x72.png",revision:"77ae66659c78aeb096a5b5107863a69c"},{url:"static/img/icons/android-chrome-96x96.png",revision:"35eef8661696086e1ac6dac1c8353761"},{url:"static/img/icons/android-chrome-maskable-192x192.png",revision:"8a739eaeec140421a7fce64795e0397f"},{url:"static/img/icons/android-chrome-maskable-512x512.png",revision:"45e89482c67c6888230a9aede75077c1"},{url:"static/img/icons/apple-touch-icon-120x120.png",revision:"ae61b05e450ea7de54538294ae61861b"},{url:"static/img/icons/apple-touch-icon-152x152.png",revision:"3f4695a18dbc835725197ef9ae2239da"},{url:"static/img/icons/apple-touch-icon-180x180.png",revision:"42d7d8b9497af271a3873881a509eb12"},{url:"static/img/icons/apple-touch-icon-60x60.png",revision:"2d2820d90f2f986328294b3a8f7ea293"},{url:"static/img/icons/apple-touch-icon-76x76.png",revision:"ade4c11fefea35c0c853b5dabcfabbf0"},{url:"static/img/icons/favicon-16x16.png",revision:"2a07e5c6cafbce3893509ff068eb48c5"},{url:"static/img/icons/favicon-32x32.png",revision:"9fc2dd2964bac8566817776e568da8a2"},{url:"static/img/icons/favicon.ico",revision:"be97e36f018b6660b1e55172949e49b5"},{url:"static/img/icons/msapplication-icon-144x144.png",revision:"2a56e6fe7e8de812b433a01d324e3b5f"},{url:"static/img/icons/safari-pinned-tab.svg",revision:"788fcfcbce8fe2c3440f696846e9ab69"},{url:"static/js/polyfill.js",revision:"8e937cf15d37b117998fe2ff6801beda"},{url:"static/img/icons/android-chrome-48x48.png",revision:"c14b70149a86584c3f3cde164993bc4e"},{url:"static/img/icons/android-chrome-72x72.png",revision:"77ae66659c78aeb096a5b5107863a69c"},{url:"static/img/icons/android-chrome-96x96.png",revision:"35eef8661696086e1ac6dac1c8353761"},{url:"static/img/icons/msapplication-icon-144x144.png",revision:"2a56e6fe7e8de812b433a01d324e3b5f"},{url:"static/img/icons/android-chrome-168x168.png",revision:"82729ed64d22b79b3d9ba65fa70a4ed3"},{url:"static/img/icons/android-chrome-192x192.png",revision:"8a739eaeec140421a7fce64795e0397f"},{url:"static/img/icons/android-chrome-512x512.png",revision:"45e89482c67c6888230a9aede75077c1"},{url:"manifest.webmanifest",revision:"ddd2ef6bbcc63845a85d083785ca4307"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(/^https:\/\/(cdn|fastly)\.jsdelivr\.net\/.*/i,new e.CacheFirst({cacheName:"jsdelivr-cache",plugins:[new e.CacheableResponsePlugin({statuses:[0,200]}),new e.ExpirationPlugin({maxEntries:10,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/cravatar\.cn\/.*/i,new e.CacheFirst({cacheName:"avatar-cache",plugins:[new e.CacheableResponsePlugin({statuses:[0,200]}),new e.ExpirationPlugin({maxEntries:10,maxAgeSeconds:31536e3})]}),"GET")}));
