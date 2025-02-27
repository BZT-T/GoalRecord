import { createRouter, createWebHistory } from "vue-router";
import MatchList from "./components/MatchList.vue";
import ClassementJoueur from "./components/ClassementJoueur.vue";
import MatchDetails from "./components/MatchDetails.vue";
import CreerJoueur from "./components/CreerJoueur.vue";

const routes = [
    { path: "/", component: MatchList },
    { path: "/classement", component: ClassementJoueur },
    { path: "/matchdetails", component: MatchDetails },
    { path: "/creerJoueur", component: CreerJoueur },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
