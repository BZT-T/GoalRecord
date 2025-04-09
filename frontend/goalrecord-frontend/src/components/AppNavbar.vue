<template>
  <nav class="p-2.5 text-center">
    <ul class="flex justify-center p-0 list-none no-underline text-white font-bold text-[1.1rem]">
      <li class="mx-[15px] hover:text-[#f8c200] "><router-link to="/">🏆 Liste des matchs</router-link></li>
      <li class="mx-[15px] hover:text-[#f8c200] "><router-link to="/classement">📊 Classement des joueurs</router-link></li>
<!--      <li class="mx-[15px] hover:text-[#f8c200] "><router-link to="/creerMatch">Ajouter un match</router-link></li>
      <li class="mx-[15px] hover:text-[#f8c200] "><router-link to="/creerJoueur">Créer un joueur</router-link></li>-->
    </ul>
  </nav>
  <div class="w-1/2 h-1 bg-white mb-2 mx-auto rounded-[10px]"></div>
</template>

<script>
export default {
  name: "AppNavbar",
};
</script>
