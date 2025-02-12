<template>
  <div class="match-container">
    <div v-for="match in matches" :key="match.idmatch" class="match-card" :class="{'winner': match.scoreequipea > match.scoreequipeb}">
      <div class="match-date">{{ new Date(match.datematch).toLocaleDateString() }}</div>
      <div class="match-card-body">
        <div class="team team-a">
          <div class="players">
            <p v-for="(player, index) in match.teamAPlayers" :key="index">{{ player }}</p>
          </div>
          <div class="score">
            <p>{{ match.scoreequipea }}</p>
          </div>
        </div>
        <div class="team team-b">
          <div class="players">
            <p v-for="(player, index) in match.teamBPlayers" :key="index">{{ player }}</p>
          </div>
          <div class="score">
            <p>{{ match.scoreequipeb }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>

export default {
  data() {
    return {
      matches: [
        {
          idmatch: 1,
          datematch : '12/12/2012',
          teamAPlayers: ['Joueur A1', 'Joueur A2', 'Joueur A3', 'Joueur A4', 'Joueur A5'],
          teamBPlayers: ['Joueur B1', 'Joueur B2', 'Joueur B3', 'Joueur B4', 'Joueur B5'],
          scoreequipea: 3,
          scoreequipeb: 2
        },
        {
          idmatch: 2,
          datematch : '12/12/2012',
          teamAPlayers: ['Joueur A6', 'Joueur A7', 'Joueur A8', 'Joueur A9', 'Joueur A10'],
          teamBPlayers: ['Joueur B6', 'Joueur B7', 'Joueur B8', 'Joueur B9', 'Joueur B10'],
          scoreequipea: 1,
          scoreequipeb: 3
        }
        // Ajoute d'autres matchs ici
      ]
    };
  }
}

</script>

<!--<script>
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
-->
<style scoped>
.match-container {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

.match-card {
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 300px; /* Largeur de la carte */
  height: auto; /* Hauteur de la carte */
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 5px;
  transition: transform 0.3s;
  cursor: pointer;
}

.match-date {
  text-align: center; /* Centrer le texte horizontalement */
  font-size: 14px;
  font-weight: bold;
  padding-bottom: 5px;
}

.match-card-body {
  display: flex;
}

.match-card:hover {
  transform: scale(1.05); /* Agrandir un peu la carte au survol */
}

.team {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
}

.team-a {
  padding-right: 10px;
  border-right: 1px solid #ddd;
}

.team-b {
  padding-left: 10px;
}

.players {
  font-size: 12px;
  margin-bottom: 5px;
}

.players p {
  margin: 3px 0;
}

.score {
  font-size: 18px;
  font-weight: bold;
}

.score p {
  margin: 0;
}

</style>
