import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";

const app = createApp(App).use(i18n);

import eventx from "./eventx";
app.use(eventx);

import constant from "./constant";
app.use(constant);

import urlx from "./urlx";
app.use(urlx);

import httpx from "./httpx";
app.use(httpx);

import i18n from "./i18n";
app.use(i18n);

import metamask from "./metamask";
app.use(metamask);


import Video from 'video.js'
import 'video.js/dist/video-js.css'

app.config.globalProperties.$video = Video;


app.use(router);
app.mount('#app');


