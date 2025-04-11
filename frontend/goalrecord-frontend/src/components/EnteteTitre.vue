<template>
  <header class="text-center text-xl font-roboto text-white mt-5">
    <div class="container">
       <h1 class="text-3xl font-bold uppercase text-4xl sm:text-5xl md:text-6xl font-bold text-shadow-md">{{ saison.nom }}</h1>
        <p class="text-xl sm:text-2xl text-base sm:text-lg italic">{{ saison.anneedebut }} - {{ saison.anneefin }}</p>
    </div>
  </header>
</template>

<script>
import apiClient from '@/services/api';

export default {
  data() {
    return {
      saison: {
        nom: "Chargement...",
        anneedebut: "",
        anneefin: ""
      }
    };
  },
  mounted() {
    apiClient.get('saison-actuelle')
        .then(response => {
          console.log(response.data);
          this.saison = response.data;
        })
        .catch(error => {
          console.error("Erreur lors de la récupération de la saison", error);
        });
  }
}
</script>

<style scoped>
</style>
