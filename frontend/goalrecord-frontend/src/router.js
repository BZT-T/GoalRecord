import { createRouter, createWebHistory } from "vue-router";
import MatchList from "./components/MatchList.vue";
import ClassementJoueur from "./components/ClassementJoueur.vue";
import MatchDetails from "./components/MatchDetails.vue";

const routes = [
    { path: "/", component: MatchList },
    { path: "/classement", component: ClassementJoueur },
    { path: "/matchdetails", component: MatchDetails },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
