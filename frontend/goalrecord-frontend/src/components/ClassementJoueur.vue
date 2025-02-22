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
        <td>{{ joueur.nom }}</td>
        <td>{{ joueur.matchsJoues }}</td>
        <td>{{ joueur.buts }}</td>
        <td>{{ joueur.passesDecisives }}</td>
        <td>{{ joueur.ratioVictoires }}%</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "ClassementJoueur",
  data() {
    return {
      joueurs: [
        { nom: "Joueur 1", matchsJoues: 10, buts: 8, passesDecisives: 5, ratioVictoires: 75 },
        { nom: "Joueur 2", matchsJoues: 12, buts: 10, passesDecisives: 7, ratioVictoires: 80 },
        { nom: "Joueur 3", matchsJoues: 9, buts: 6, passesDecisives: 4, ratioVictoires: 70 },
        { nom: "Joueur 4", matchsJoues: 15, buts: 12, passesDecisives: 10, ratioVictoires: 85 }
      ]
    };
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
