<template>
  <div class="overflow">
    <button class="button-53" @click="goBack" role="button">Retour</button>
    <div class="classement-body">
      <div class="table-container">
        <table>
          <thead>
          <tr>
            <th>Position</th>
            <th>Joueur</th>
            <th>Matchs joués</th>
            <th>Buts</th>
            <th>Passes décisives</th>
            <th>GA/A</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(joueur, index) in joueurs" :key="index" :class="getPositionClass(index)">
            <td>
                  <span>
                  <span v-if="index === 0">🥇</span>
                  <span v-else-if="index === 1">🥈</span>
                  <span v-else-if="index === 2">🥉</span>
                  <span v-else>{{ index + 1 }}</span>
                </span>
            </td>
            <td>{{ getInitials(joueur.nom, joueur.prenom) }}</td>
            <td>{{ joueur.nbMatch }}</td>
            <td>{{ joueur.nbBut }}</td>
            <td>{{ joueur.nbPasseD }}</td>
            <td>{{ getGoalAssistAverage(joueur.nbBut, joueur.nbPasseD, joueur.nbMatch) }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
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
          console.log(this.joueurs);
        })
        .catch(error => {
          console.error("Erreur lors de la récupération du classement : ", error);
        });
  },
  methods: {
    getInitials(nom, prenom) {
      return `${nom.charAt(0).toUpperCase()}. ${prenom}`;
    },
    getGoalAssistAverage(nbBut, nbPasse, nbMatch) {
      return nbMatch === 0 ? 0 : ((+nbBut + +nbPasse) / nbMatch).toFixed(2);
    },
    goBack() {
      this.$router.go(-1);
    },
    getPositionClass(index) {
      if (index === 0) {
        return 'first-position';
      } else if (index === 1) {
        return 'second-position';
      } else if (index === 2) {
        return 'third-position';
      }
      return '';
    }
  }
};
</script>

<style scoped>
.overflow {
  overflow: hidden;
  max-height: 100vh;
}

.classement-body {
  display: flex;
  align-items: center;
  flex-direction: column;
  color: white;
  min-height: 100vh;
  padding: 20px;
}

.table-container {
  max-height: 550px;
  overflow-y: auto;
  width: 80%;
  background: rgba(0, 0, 0, 0.3); /* légère transparence pour l'effet visuel */
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

table {
  width: 100%;
  border-collapse: collapse;
  color: white;
  padding: 10px;
}

th, td {
  padding: 12px;
  text-align: center;
  vertical-align: middle;
}

th {
  border-bottom: 2px solid #ffffff;
  font-size: 1.7rem;
  position: sticky;
  top: 0;
  background-color: #006400;
  z-index: 1;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

td {
  border-bottom: 1px solid white;
  font-size: 1.5rem;
  background-color: rgba(213, 246, 213, 0.47);
}

.table-container::-webkit-scrollbar {
  width: 8px;
}

.table-container::-webkit-scrollbar-track {
  background: transparent;
}

.table-container::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
}

.table-container::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.8);
}

.button-53 {
  background-color: #006400;
  border: 0 solid #E5E7EB;
  box-sizing: border-box;
  color: #ffffff;
  display: flex;
  font-family: ui-sans-serif, system-ui, -apple-system, system-ui, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-size: 1rem;
  font-weight: 700;
  justify-content: center;
  line-height: 1.75rem;
  padding: .75rem 1.65rem;
  position: relative;
  text-align: center;
  text-decoration: none #000000 solid;
  text-decoration-thickness: auto;
  width: 100%;
  max-width: 460px;
  cursor: pointer;
  transform: rotate(-2deg);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  margin: 8px;
}

.button-53:focus {
  outline: 0;
}

.button-53:after {
  content: '';
  position: absolute;
  border: 1px solid #ffffff;
  bottom: 4px;
  left: 4px;
  width: calc(100% - 1px);
  height: calc(100% - 1px);
}

.button-53:hover:after {
  bottom: 2px;
  left: 2px;
}

@media (min-width: 768px) {
  .button-53 {
    padding: .75rem 3rem;
    font-size: 1.25rem;
  }
}

.first-position {
  background-color: rgba(255, 250, 0, 0.67); /* Couleur or pour la première position */
  color: black;
  font-weight: bold;
}

.second-position {
  background-color: rgba(192, 192, 192, 0.67); /* Couleur argentée pour la deuxième position */
  color: black;
  font-weight: bold;
}

.third-position {
  background-color: rgba(205, 127, 50, 0.67); /* Couleur bronze pour la troisième position */
  color: black;
  font-weight: bold;
}

.first-position, .second-position, .third-position {
  font-size: 1.5rem;
  font-weight: bold;
}

</style>
