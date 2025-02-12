import { createRouter, createWebHistory } from "vue-router";
import MatchList from "./components/MatchList.vue";
import ClassementJoueur from "./components/ClassementJoueur.vue"; // À créer

const routes = [
    { path: "/", component: MatchList },
    { path: "/ClassementJoueur", component: ClassementJoueur }, // Ajoute la page Classement
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
