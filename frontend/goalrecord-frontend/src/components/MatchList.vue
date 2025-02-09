<template>
  <div>
    <h1>Liste des matchs</h1>
    <ul>
      <li v-for="match in matches" :key="match.id">
        Match {{ match.id }} : {{ match.score }}
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
          this.matches = response.data;
        })
        .catch(error => {
          console.log(this);
          console.error("Il y a une erreur lors de la récupération des matchs", error);
        });
  }
}
</script>

<style scoped>
/* Style spécifique au composant */
</style>
