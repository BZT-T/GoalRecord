<template>
  <div class="classement-body">
    <table>
      <thead>
      <tr>
        <th>Position</th>
        <th>Joueur</th>
        <th>Matchs joués</th>
        <th>Buts</th>
        <th>Passes décisives</th>
        <th>Ratio Victoires</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(joueur, index) in joueurs" :key="index">
        <td>{{ index + 1 }}</td>
        <td>{{ getInitials(joueur.nom, joueur.prenom) }}</td>
        <td>{{ joueur.nbMatch }}</td>
        <td>{{ joueur.nbBut }}</td>
        <td>{{ joueur.nbPasseD }}</td>
        <td>{{ getRatioVictoire(joueur.nbVictoire, joueur.nbMatch) }}%</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "ClassementJoueur",
  data() {
    return {
      joueurs: []  // Liste vide qui sera remplie avec les joueurs venant du serveur
    };
  },
  mounted() {
    axios.get('http://localhost:3000/api/classement')
        .then(response => {
          this.joueurs = response.data;
        })
        .catch(error => {
          console.error("Erreur lors de la récupération du classement : ", error);
        });
  },
  methods: {
    getInitials(nom, prenom) {
      return `${nom.charAt(0).toUpperCase()}. ${prenom}`;
    },
    getRatioVictoire(nbVictoire, nbMatch) {
      return nbMatch === 0 ? 0 : ((nbVictoire / nbMatch) * 100).toFixed(2);
    }
  }
};
</script>

<style scoped>
.classement-body {
  display: flex;
  align-items: center;
  flex-direction: column;
  //background: blueviolet;
  color: white;
  min-height: 100vh;
  padding: 20px;
}

table {
  width: 80%;
  border-collapse: collapse;
  color: white;
  //background: green; /* Fond de la table pour mieux voir */
  padding: 10px;
}

th, td {
  padding: 10px;
  text-align: center; /* Centre horizontalement */
  vertical-align: middle; /* Centre verticalement */
}

th {
  border-bottom: 2px solid white;
  font-size: 1.7rem;
  //background: orange; /* Permet de voir l'espace entre les en-têtes */
}

td {
  border-bottom: 1px solid white;
  font-size: 1.5rem;
  //background: blue; /* Pour bien voir la disposition des cellules */
}
</style>
