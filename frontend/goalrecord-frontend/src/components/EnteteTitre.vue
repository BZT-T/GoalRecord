<template>
  <header class="header">
    <h1>{{ saison.nom }}</h1>
    <p>{{ saison.anneedebut }} - {{ saison.anneefin }}</p>
  </header>
</template>

<script>
import axios from 'axios';

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
    axios.get('http://localhost:3000/api/saison-actuelle')
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
.header {
  background-color: #333;
  color: white;
  text-align: center;
  padding: 15px;
  font-size: 20px;
}
</style>