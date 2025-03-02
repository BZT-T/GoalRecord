import { createRouter, createWebHistory } from "vue-router";
import MatchList from "./components/MatchList.vue";
import ClassementJoueur from "./components/ClassementJoueur.vue";
import MatchDetails from "./components/MatchDetails.vue";
import CreerJoueur from "./components/CreerJoueur.vue";
import CreerMatch from "./components/CreerMatch.vue";

const routes = [
    { path: "/", component: MatchList },
    { path: "/classement", component: ClassementJoueur },
    { path: "/matchDetails/:id", name: "matchDetails", component: MatchDetails },
    { path: "/creerJoueur", component: CreerJoueur },
    { path: "/creerMatch", component: CreerMatch },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
