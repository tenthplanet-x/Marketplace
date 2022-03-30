import {createRouter, createWebHashHistory} from 'vue-router';


import Home from "../page/Home";
import Gallery from "../page/Gallery";
import Mint from "@/page/Mint";



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
            path: '/mint',
            component: Mint
        }

    ]
});

export default router;
