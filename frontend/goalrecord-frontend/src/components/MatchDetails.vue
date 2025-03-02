<template>
  <div class="container">
    <div class="information">
      <!-- Informations supplémentaires sur le match -->
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
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      matchId: this.$route.params.id, // Récupérer l'ID du match depuis l'URL
      dateMatch: '',
      lieuMatch: '',
      joueursA: [],
      joueursB: []
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
    }
  }
};
</script>

<style scoped>
.container {
  padding-bottom: 15px;
  display: flex;
  justify-content: space-evenly;
}

.information {
  position: relative;
  width: 600px;
  height: 600px;
  background-color: #ffffff;
  border: 2px solid #fff;
  border-radius: 10px;
}

.terrain {
  position: relative;
  width: 600px;
  height: 600px;
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
  left: 150px; /* Après la zone gauche */
  right: 150px; /* Avant la zone droite */
  height: 100%; /* Remplir toute la hauteur */
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Espacement entre les surfaces haut et bas */
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
  border-top: none; /* Enlever la bordure du bas pour la surface-haut */
  top: 0;
  display: flex;
  justify-content: center;
}

.surface-bas {
  border: 2px solid white;
  border-bottom: none; /* Enlever la bordure du haut pour la surface-bas */
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
  background-color: #59b53f; /* Couleur bleue pour l'avatar */
  border-radius: 50%;
  margin-bottom: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); /* Ombre autour du point */
}

.nomjoueur {
  font-size: 26px;
  font-weight: bold;
  color: #ffffff;
  font-family: 'Arial', sans-serif;
  text-transform: capitalize;
  letter-spacing: 1px;
}

</style>
