import { createRouter, createWebHistory } from "vue-router";
import MatchList from "./components/MatchList.vue";
import ClassementJoueur from "./components/ClassementJoueur.vue";
import MatchDetails from "./components/MatchDetails.vue";
import CreerJoueur from "./components/CreerJoueur.vue";
import CreerMatch from "./components/CreerMatch.vue";

const routes = [
    { path: "/", component: MatchList, meta: { hideHeader: false,} },
    { path: "/classement", component: ClassementJoueur, meta: { hideHeader: true,} },
    { path: "/matchDetails/:id", name: "matchDetails", component: MatchDetails, meta: { hideHeader: true,} },
    { path: "/creerJoueur", component: CreerJoueur, meta: { hideHeader: false,} },
    { path: "/creerMatch", component: CreerMatch, meta: { hideHeader: false,} },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
