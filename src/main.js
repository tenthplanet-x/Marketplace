import { createApp } from 'vue'
import App from './App.vue'

import './assets/css/index.css'


const app = createApp(App);

import eventx from "./eventx";
app.use(eventx);

import constant from "./constant";
app.use(constant);

import urlx from "./urlx";
app.use(urlx);

import httpx from "./httpx";
app.use(httpx);

//import i18n from "./i18n";
//app.use(i18n);

import Video from 'video.js'
import 'video.js/dist/video-js.css'
app.config.globalProperties.$video = Video;


import metamask from "./metamask";
app.use(metamask);

import router from "./router";
app.use(router);

app.mount('#app');
