<template>
  <div class="match-container">
    <div v-for="match in matches" :key="match.idmatch" class="match-card"
         :class="{'winner': match.scoreEquipeA > match.scoreEquipeB}">
      <div class="card-body">

        <div class="team team-a">
          <div class="score">{{ match.scoreEquipeA }}</div>
        </div>
        <div>
          <div class="match-date">{{ new Date(match.dateMatch).toLocaleDateString() }}</div>
          <div class="match-card-body">

            <!-- Nom des joueurs équipe A (horizontalement) -->
            <div class="players team-a-players">
              <p v-for="(player, index) in match.joueursA" :key="index">{{getInitials(player.nom, player.prenom)}}</p>
            </div>

            <!-- Séparateur VS -->
            <div class="vs-separator">VS</div>

            <!-- Nom des joueurs équipe B (horizontalement) -->
            <div class="players team-b-players">
              <p v-for="(player, index) in match.joueursB" :key="index">{{ getInitials(player.nom, player.prenom) }}</p>
            </div>

          </div>
        </div>
        <div class="team team-b">
          <div class="score">{{ match.scoreEquipeB }}</div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      matches: []
    };
  },mounted() {
    axios.get('http://localhost:3000/api/matchs')
        .then(response => {
          this.matches = response.data;
        })
        .catch(error => {
          console.error("Erreur lors de la récupération du classement : ", error);
        });
  },
  methods: {
    getInitials(nom, prenom) {
      return `${nom.charAt(0).toUpperCase()}. ${prenom}`;
    }
  }
}
</script>

<style scoped>
.match-container {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  width: 100%;
}

.match-card {
  display: flex;
  flex-direction: column;
  width: 100%; /* Occupe toute la largeur de l'espace disponible */
  height: auto;
  border: 2px solid black;
  border-radius: 25px;
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 15px;
  transition: transform 0.3s;
  cursor: pointer;
  margin: 0px 50px 10px 50px;
}

.match-date {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  padding-bottom: 10px;
}

.match-card-body {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row; /* Alignement horizontal des éléments */
}

.card-body {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
}

.team-a {
  padding-right: 10px;
  border-right: 1px solid #ddd;
}

.team-b {
  padding-left: 10px;
  border-left: 1px solid #ddd;
}

.players {
  display: flex; /* Mettre les joueurs sur une ligne */
  flex-direction: row; /* Horizontalement */
  font-size: 18px;
  margin-bottom: 5px;
}

.players p {
  margin: 3px 5px; /* Espacement horizontal entre les joueurs */
}

.team-a-players p {
  font-style: italic;

}

.team-b-players p {
  transform: scale(1) rotate(0deg) translate(0px, 0px) skew(10deg, 0deg);
}

.score {
  font-size: 50px;
  font-weight: bold;
}

.vs-separator {
  font-size: 20px;
  font-weight: bold;
  color: #333;
  padding: 0 15px;
}

.match-card:hover {
  transform: scale(1.02);
}
</style>
