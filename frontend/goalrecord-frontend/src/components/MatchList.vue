<template>
  <div class="match-container">
    <div v-for="match in matches" :key="match.idmatch" class="match-card"
         :class="{'winner': match.scoreequipea > match.scoreequipeb}">
      <div class="card-body">

        <div class="team team-a">
          <div class="score">{{ match.scoreequipea }}</div>
        </div>
        <div>
          <div class="match-date">{{ new Date(match.datematch).toLocaleDateString() }}</div>
          <div class="match-card-body">

            <!-- Nom des joueurs équipe A (horizontalement) -->
            <div class="players team-a-players">
              <p v-for="(player, index) in match.teamAPlayers" :key="index">{{ player }}</p>
            </div>

            <!-- Séparateur VS -->
            <div class="vs-separator">VS</div>

            <!-- Nom des joueurs équipe B (horizontalement) -->
            <div class="players team-b-players">
              <p v-for="(player, index) in match.teamBPlayers" :key="index">{{ player }}</p>
            </div>

          </div>
        </div>
        <div class="team team-b">
          <div class="score">{{ match.scoreequipeb }}</div>
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
          datematch: '12/12/2012',
          teamAPlayers: ['Joueur A1', 'Joueur A2', 'Joueur A3', 'Joueur A4', 'Joueur A5'],
          teamBPlayers: ['Joueur B1', 'Joueur B2', 'Joueur B3', 'Joueur B4', 'Joueur B5'],
          scoreequipea: 3,
          scoreequipeb: 2
        },
        {
          idmatch: 2,
          datematch: '12/12/2012',
          teamAPlayers: ['Joueur A6', 'Joueur A7', 'Joueur A8', 'Joueur A9', 'Joueur A10'],
          teamBPlayers: ['Joueur B6', 'Joueur B7', 'Joueur B8', 'Joueur B9', 'Joueur B10'],
          scoreequipea: 1,
          scoreequipeb: 3
        },
        {
          idmatch: 2,
          datematch: '12/12/2012',
          teamAPlayers: ['Joueur A6', 'Joueur A7', 'Joueur A8', 'Joueur A9', 'Joueur A10'],
          teamBPlayers: ['Joueur B6', 'Joueur B7', 'Joueur B8', 'Joueur B9', 'Joueur B10'],
          scoreequipea: 1,
          scoreequipeb: 3
        },
        {
          idmatch: 2,
          datematch: '12/12/2012',
          teamAPlayers: ['Joueur A6', 'Joueur A7', 'Joueur A8', 'Joueur A9', 'Joueur A10'],
          teamBPlayers: ['Joueur B6', 'Joueur B7', 'Joueur B8', 'Joueur B9', 'Joueur B10'],
          scoreequipea: 1,
          scoreequipeb: 3
        },
        {
          idmatch: 2,
          datematch: '12/12/2012',
          teamAPlayers: ['Joueur A6', 'Joueur A7', 'Joueur A8', 'Joueur A9', 'Joueur A10'],
          teamBPlayers: ['Joueur B6', 'Joueur B7', 'Joueur B8', 'Joueur B9', 'Joueur B10'],
          scoreequipea: 1,
          scoreequipeb: 3
        }
      ]
    };
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
