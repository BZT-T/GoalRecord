<template>
  <header class="header">
    <div class="container">
       <h1>{{ saison.nom }}</h1>
        <p>{{ saison.anneedebut }} - {{ saison.anneefin }}</p>
    </div>
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
/* Style de base, commun à toutes les saisons */
.header {
  text-align: center;
  font-size: 20px;
  font-family: 'Roboto', sans-serif;
}

.header h1 {
  font-size: 3rem;
  font-weight: bold;
  text-transform: uppercase;
}

.header p {
  font-size: 1.2rem;
  font-style: italic;
}

</style>
