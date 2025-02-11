<template>
  <div>
    <h1>Liste des matchs</h1>
    <ul>
      <li v-for="match in matches" :key="match.idmatch">
        Match {{ match.idmatch }} : {{ match.scoreequipea }} - {{ match.scoreequipeb }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      matches: []
    }
  },
  mounted() {

    axios.get('http://localhost:3000/api/matches')  // Remplace par ton endpoint
        .then(response => {
          console.log("Matchs : ");
          console.log(this);
          this.matches = response.data;
        })
        .catch(error => {
          console.log("Erreur : ");
          console.log(this);
          console.error("Il y a une erreur lors de la récupération des matchs", error);
        });
  }
}
</script>

<style scoped>
/* Style spécifique au composant */
</style>
