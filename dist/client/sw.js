if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,a)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(s[r])return;let o={};const c=e=>i(e,r),l={module:{uri:r},exports:o,require:c};s[r]=Promise.all(n.map((e=>l[e]||c(e)))).then((e=>(a(...e),o)))}}define(["./workbox-b5f9716b"],(function(e){"use strict";e.setCacheNameDetails({prefix:"mmf-blog-vite-vue3-ssr"}),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/404-i2AWfS3M.js",revision:null},{url:"assets/a-input.vue_vue_type_script_setup_true_lang-iFHGT6Vc.js",revision:null},{url:"assets/back-top-gl_T40gB.png",revision:null},{url:"assets/backend-admin-list-wXy7Gh5j.js",revision:null},{url:"assets/backend-admin-modify-sRMDEb_0.js",revision:null},{url:"assets/backend-article-comment-1Q0sjjqU.js",revision:null},{url:"assets/backend-article-insert-_ZTcalhi.js",revision:null},{url:"assets/backend-article-list-7TftK2Yh.js",revision:null},{url:"assets/backend-article-modify-RMfOjO_q.js",revision:null},{url:"assets/backend-category-insert-bhsBngjf.js",revision:null},{url:"assets/backend-category-list-DWXvNIgU.js",revision:null},{url:"assets/backend-category-modify-T8cPQ7gq.js",revision:null},{url:"assets/backend-index-GGC6wByC.js",revision:null},{url:"assets/backend-login-vbuvjajS.js",revision:null},{url:"assets/backend-user-list-lKWlDYoz.js",revision:null},{url:"assets/backend-user-modify-EtzAX7jn.js",revision:null},{url:"assets/circle-loading-HhBd__fq.png",revision:null},{url:"assets/frontend-about-IgJNZHjy.js",revision:null},{url:"assets/frontend-article-mMFzhLQV.js",revision:null},{url:"assets/frontend-index-Y5IAzZV5.js",revision:null},{url:"assets/frontend-user-account-s9XX4FF2.js",revision:null},{url:"assets/frontend-user-password-VAfI5QmT.js",revision:null},{url:"assets/frontend-user-uJeTgr2R.js",revision:null},{url:"assets/main-chZd5RVt.css",revision:null},{url:"assets/main-fy7d0V9h.js",revision:null},{url:"assets/nav-logo-D6sQ_rex.png",revision:null},{url:"assets/nav-logo-qrf4_vsP.png",revision:null},{url:"assets/upload-api-uVvbjo2i.js",revision:null},{url:"assets/use-backend-admin-store-gu_8j18r.js",revision:null},{url:"assets/use-backend-article-store-mW291zjX.js",revision:null},{url:"assets/use-backend-user-store-FN9hoIOI.js",revision:null},{url:"assets/use-frontend-article-store-W55gClCL.js",revision:null},{url:"assets/use-global-category-store-Cm2J6F5W.js",revision:null},{url:"assets/use-global-comment-store-jydDasob.js",revision:null},{url:"assets/vue-content-loader.es-EVJt4j3I.js",revision:null},{url:"assets/vue.f36acd1f-moDjT6Xe.js",revision:null},{url:"assets/workbox-window.prod.es5-zUWdUQO_.js",revision:null},{url:"favicon.ico",revision:"be97e36f018b6660b1e55172949e49b5"},{url:"robots.txt",revision:"9be51bc77d1946a265bc5b63f4394859"},{url:"static/images/avatar.png",revision:"2b02841e980a26eec00f3587b5661880"},{url:"static/images/topic-1.png",revision:"4cb37ea61ecb0ea8baf686c9675f8bcf"},{url:"static/img/icons/android-chrome-168x168.png",revision:"82729ed64d22b79b3d9ba65fa70a4ed3"},{url:"static/img/icons/android-chrome-192x192.png",revision:"8a739eaeec140421a7fce64795e0397f"},{url:"static/img/icons/android-chrome-48x48.png",revision:"c14b70149a86584c3f3cde164993bc4e"},{url:"static/img/icons/android-chrome-512x512.png",revision:"45e89482c67c6888230a9aede75077c1"},{url:"static/img/icons/android-chrome-72x72.png",revision:"77ae66659c78aeb096a5b5107863a69c"},{url:"static/img/icons/android-chrome-96x96.png",revision:"35eef8661696086e1ac6dac1c8353761"},{url:"static/img/icons/android-chrome-maskable-192x192.png",revision:"8a739eaeec140421a7fce64795e0397f"},{url:"static/img/icons/android-chrome-maskable-512x512.png",revision:"45e89482c67c6888230a9aede75077c1"},{url:"static/img/icons/apple-touch-icon-120x120.png",revision:"ae61b05e450ea7de54538294ae61861b"},{url:"static/img/icons/apple-touch-icon-152x152.png",revision:"3f4695a18dbc835725197ef9ae2239da"},{url:"static/img/icons/apple-touch-icon-180x180.png",revision:"42d7d8b9497af271a3873881a509eb12"},{url:"static/img/icons/apple-touch-icon-60x60.png",revision:"2d2820d90f2f986328294b3a8f7ea293"},{url:"static/img/icons/apple-touch-icon-76x76.png",revision:"ade4c11fefea35c0c853b5dabcfabbf0"},{url:"static/img/icons/favicon-16x16.png",revision:"2a07e5c6cafbce3893509ff068eb48c5"},{url:"static/img/icons/favicon-32x32.png",revision:"9fc2dd2964bac8566817776e568da8a2"},{url:"static/img/icons/favicon.ico",revision:"be97e36f018b6660b1e55172949e49b5"},{url:"static/img/icons/msapplication-icon-144x144.png",revision:"2a56e6fe7e8de812b433a01d324e3b5f"},{url:"static/img/icons/safari-pinned-tab.svg",revision:"788fcfcbce8fe2c3440f696846e9ab69"},{url:"static/js/polyfill.js",revision:"8e937cf15d37b117998fe2ff6801beda"},{url:"static/img/icons/android-chrome-48x48.png",revision:"c14b70149a86584c3f3cde164993bc4e"},{url:"static/img/icons/android-chrome-72x72.png",revision:"77ae66659c78aeb096a5b5107863a69c"},{url:"static/img/icons/android-chrome-96x96.png",revision:"35eef8661696086e1ac6dac1c8353761"},{url:"static/img/icons/msapplication-icon-144x144.png",revision:"2a56e6fe7e8de812b433a01d324e3b5f"},{url:"static/img/icons/android-chrome-168x168.png",revision:"82729ed64d22b79b3d9ba65fa70a4ed3"},{url:"static/img/icons/android-chrome-192x192.png",revision:"8a739eaeec140421a7fce64795e0397f"},{url:"static/img/icons/android-chrome-512x512.png",revision:"45e89482c67c6888230a9aede75077c1"},{url:"manifest.webmanifest",revision:"ddd2ef6bbcc63845a85d083785ca4307"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(/^https:\/\/(cdn|fastly)\.jsdelivr\.net\/.*/i,new e.CacheFirst({cacheName:"jsdelivr-cache",plugins:[new e.CacheableResponsePlugin({statuses:[0,200]}),new e.ExpirationPlugin({maxEntries:10,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/cravatar\.cn\/.*/i,new e.CacheFirst({cacheName:"avatar-cache",plugins:[new e.CacheableResponsePlugin({statuses:[0,200]}),new e.ExpirationPlugin({maxEntries:10,maxAgeSeconds:31536e3})]}),"GET")}));
