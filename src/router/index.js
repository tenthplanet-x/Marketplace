import {createRouter, createWebHashHistory} from 'vue-router';


import Gallery from "../page/Gallery.vue";
import Font from "../page/Font.vue";

import Home from "../page/Home.vue";
import Trailer from "../page/Trailer.vue";
import Metamask from "../page/Metamask.vue";



const router = createRouter({
    history: createWebHashHistory(),
    routes: [
      {
            path: '/',
            component: Home
        },
       {
            path: '/gallery',
            component: Gallery
        },
        {
            path: '/trailer',
            component: Trailer
        },
      /**     {
            path: '/mint',
            component: Mint
        },
         */
        {
            path: '/font',
            component: Font
        },
        {
            path: '/metamask',
            component: Metamask,
        }

    ]
});

export default router;
