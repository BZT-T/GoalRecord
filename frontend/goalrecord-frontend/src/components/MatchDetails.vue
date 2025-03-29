<template>
  <div class="overflow">
    <button class="button-53" @click="goBack" role="button">Retour</button>
    <div class="container">
      <div class="information">
        <div class="information-header">
          <div class="score-container">
            <span class="team-name">Équipe A</span>
            <h2 class="score">{{ scoreEquipeA }} - {{ scoreEquipeB }}</h2>
            <span class="team-name">Équipe B</span>
          </div>
          <p class="match-info">{{ formatDate(dateMatch) }} - {{ lieuMatch }}</p>
        </div>
        <div class="actions-container">
          <div class="separator"><span></span>Coup d'envoi<span></span></div>
          <div
              v-for="action in actions"
              :key="action.minute"
              class="action"
              :class="{'align-left': action.equipe === 'A', 'align-right': action.equipe === 'B'}"
          >
            <span class="minute">{{ action.minute }}'</span>
            <span class="buteur">
          {{ getInitials(action.buteur.nom, action.buteur.prenom) }}
      </span>
            <span v-if="action.passeur" class="passeur">
        (Assist: {{ getInitials(action.passeur.nom, action.passeur.prenom) }})
      </span>
          </div>
          <div class="separator"><span></span>Fin du match<span></span></div>
        </div>
      </div>


      <div class="terrain">
        <div class="zone zone-gauche">
          <div class="zone-gauche-haut">
            <div class="joueur">
              <div class="point"></div>
              <div class="nomjoueur">{{ getInitials(joueursA[0]?.nom, joueursA[0]?.prenom) }}</div> <!-- A1 -->
            </div>
            <div class="joueur">
              <div class="point"></div>
              <div class="nomjoueur">{{ getInitials(joueursA[1]?.nom, joueursA[1]?.prenom) }}</div> <!-- A2 -->
            </div>
          </div>

          <div class="zone-gauche-bas">
            <div class="joueur">
              <div class="nomjoueur">{{ getInitials(joueursB[0]?.nom, joueursB[0]?.prenom) }}</div> <!-- B1 -->
              <div class="point"></div>
            </div>
            <div class="joueur">
              <div class="nomjoueur">{{ getInitials(joueursB[1]?.nom, joueursB[1]?.prenom) }}</div> <!-- B2 -->
              <div class="point"></div>
            </div>
          </div>
        </div>

        <div class="milieu">
          <div class="surface-haut">
            <div class="joueur">
              <div class="point"></div>
              <div class="nomjoueur">{{ getInitials(joueursA[2]?.nom, joueursA[2]?.prenom) }}</div> <!-- A3 -->
            </div>
          </div>
          <div class="EquipeA" >Equipe A</div>
          <div class="EquipeB" >Equipe B</div>
          <div class="surface-bas">
            <div class="joueur">
              <div class="nomjoueur">{{ getInitials(joueursB[2]?.nom, joueursB[2]?.prenom) }}</div> <!-- B3 -->
              <div class="point"></div>
            </div>
          </div>
        </div>

        <div class="zone zone-droite">
          <div class="zone-droite-haut">
            <div class="joueur">
              <div class="point"></div>
              <div class="nomjoueur">{{ getInitials(joueursA[3]?.nom, joueursA[3]?.prenom) }}</div> <!-- A4 -->
            </div>
            <div class="joueur">
              <div class="point"></div>
              <div class="nomjoueur">{{ getInitials(joueursA[4]?.nom, joueursA[4]?.prenom) }}</div> <!-- A5 -->
            </div>
          </div>

          <div class="zone-droite-bas">
            <div class="joueur">
              <div class="nomjoueur">{{ getInitials(joueursB[3]?.nom, joueursB[3]?.prenom) }}</div> <!-- B4 -->
              <div class="point"></div>
            </div>
            <div class="joueur">
              <div class="nomjoueur">{{ getInitials(joueursB[4]?.nom, joueursB[4]?.prenom) }}</div> <!-- B5 -->
              <div class="point"></div>
            </div>
          </div>
        </div>

        <div class="centre">
          <div class="cercle-centrale"></div>
        </div>

        <div class="ligne-de-milieu"></div>
        <div class="cercle-milieu"></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      matchId: this.$route.params.id,
      dateMatch: '',
      lieuMatch: '',
      joueursA: [],
      joueursB: [],
      scoreEquipeA: 0,
      scoreEquipeB: 0,
      actions: []
    };
  },
  mounted() {
    this.recupererMatchDetails();
  },
  methods: {
    async recupererMatchDetails() {
      try {
        const response = await axios.get(`http://localhost:3000/api/match/${this.matchId}`);
        const matchData = response.data;
        this.dateMatch = matchData.dateMatch;
        this.lieuMatch = matchData.lieuMatch;
        this.joueursA = matchData.joueursA;
        this.joueursB = matchData.joueursB;
        this.scoreEquipeA = matchData.scoreEquipeA;
        this.scoreEquipeB = matchData.scoreEquipeB;
        this.actions = matchData.actions;

      } catch (error) {
        console.error("Erreur lors de la récupération des détails du match", error);
      }
    },
    getInitials(nom, prenom) {
      if (prenom && nom) {
        return `${nom.charAt(0).toUpperCase()}. ${prenom}`;
      } else {
        return '';
      }
    },
    formatDate(date) {
      if (!date) return "";
      const options = {day: "2-digit", month: "long", year: "numeric"};
      return new Date(date).toLocaleDateString("fr-FR", options);
    },
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>

.overflow {
  overflow: hidden;
  max-height: 100vh;
}

.container {
  margin-top: 10px;
  padding: 0 15px;
  display: flex;
  justify-content: space-evenly;
}

.terrain {
  position: relative;
  width: 600px;
  background-color: #006400; /* Couleur du terrain */
  border: 2px solid #fff;
  border-radius: 10px;
}

.zone {
  position: absolute;
  top: 0;
  width: 170px;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.2);
}

.zone-gauche-haut,
.zone-gauche-bas,
.zone-droite-haut,
.zone-droite-bas {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 50%;
}

.zone-gauche {
  left: 0;
}

.zone-droite {
  right: 0;
}

.milieu {
  position: absolute;
  top: 0;
  left: 150px;
  right: 150px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.milieu {
  position: absolute;
  top: 0;
  left: 150px; /* Après la zone gauche */
  right: 150px; /* Avant la zone droite */
  height: 100%; /* Remplir toute la hauteur */
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Espacement entre les surfaces haut et bas */
}

.surface-haut,
.surface-bas {
  position: relative;
  width: 60%;
  height: 100px;
  margin: 0 auto;
}

.surface-haut {
  border: 2px solid white;
  border-top: none;
  top: 0;
  display: flex;
  justify-content: center;
}

.surface-bas {
  border: 2px solid white;
  border-bottom: none;
  bottom: 0;
}

.centre {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
}

.cercle-centrale {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 50px;
  height: 50px;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 50%;
  transform: translate(-50%, -50%);
}

.ligne-de-milieu {
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: white;
}

.cercle-milieu {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 20px;
  height: 20px;
  background-color: white;
  border-radius: 50%;
  transform: translate(-50%, -50%);
}

.joueur {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
}

.point {
  width: 50px;
  height: 50px;
  background-color: #59b53f;
  border-radius: 50%;
  margin-bottom: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.nomjoueur {
  font-size: 26px;
  font-weight: bold;
  color: #ffffff;
  font-family: 'Arial', sans-serif;
  text-transform: capitalize;
  letter-spacing: 1px;
}

.EquipeA, .EquipeB {
  position: absolute;
  font-size: 2rem;
  font-weight: bold;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.2); /* Blanc très transparent */
  text-align: center;
  width: 100%;
}

.EquipeA {
  top: 35%;
  left: 0;
}

.EquipeB {
  bottom: 35%;
  left: 0;
}

.information {
  position: relative;
  width: 580px;
  height: 550px;
  background: url("../assets/styles/img/image-mesh-gradient.png");
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Ombre douce */
  padding: 20px;
  font-family: 'Arial', sans-serif;
  border: 2px solid white;
}

/* Header de l'information */
.information-header {
  position: sticky;
  top: 0;
  background-color: rgb(0, 0, 0, 0.4);
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1;
}

/* Conteneur du score */
.score-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.team-name {
  font-size: 22px;
  font-weight: bold;
  color: #ffffff;
  text-transform: uppercase;
}

.score {
  font-size: 48px;
  font-weight: bold;
  margin: 0 15px;
  color: #ffffff; /* Couleur du score */
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2); /* Ombre pour le score */
}

.match-info {
  text-align: center;
  font-size: 14px;
  color: #ffffff;
  margin-top: 5px;
  font-weight: bold;
}

.actions-container {
  display: flex;
  flex-direction: column;
  gap: 7px;
  max-height: calc(100% - 92px);
  overflow-y: scroll;
}

.actions-container::-webkit-scrollbar {
  width: 8px;
}

.actions-container::-webkit-scrollbar-track {
  background: transparent;
}

.actions-container::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
}

.actions-container::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.8);
}

.separator {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
  color: #ffffff;
  margin: 15px 0;
}
.separator span {
  flex: 1;
  height: 1px;
  background-color: #ffffff ;
  margin: 0 10px;
}

/* Action individuelle */
.action {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 15px;
  border-radius: 6px;
  font-size: 16px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.08);
  transition: background-color 0.3s ease;
}

.action:hover {
  background-color: rgba(194, 244, 180, 0.4);
}

.align-left {
  align-self: flex-start;
  background-color: #ffffff;
  padding-left: 15px;
  border-left: 5px solid #c2f4b4;
}

.align-right {
  align-self: flex-end;
  background-color: rgb(255, 255, 255);
  padding-right: 15px;
  border-right: 5px solid #006400;
}

.minute {
  font-weight: bold;
  color: #000000;
}

.buteur {
  font-weight: bold;
  color: #000000;
}

.passeur {
  font-style: italic;
  color: #777;
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

</style>

