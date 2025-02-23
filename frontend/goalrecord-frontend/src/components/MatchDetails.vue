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
            <div class="nomjoueur">yassine</div>
          </div>
          <div class="joueur">
            <div class="point"></div>
            <div class="nomjoueur">elies</div>
          </div>
        </div>

        <div class="zone-gauche-bas">
          <div class="joueur">
            <div class="nomjoueur">simeon</div>
            <div class="point"></div>
          </div>
          <div class="joueur">
            <div class="nomjoueur">ibrahim</div>
            <div class="point"></div>
          </div>
        </div>

      </div>

      <!-- Zone du milieu placée entre les deux autres zones -->
      <div class="milieu">
        <div class="surface-haut">
          <div class="joueur">
            <div class="point"></div>
            <div class="nomjoueur">issam</div>
          </div>

        </div>
        <div class="surface-bas">
          <div class="joueur">
            <div class="nomjoueur">ahmed</div>
            <div class="point"></div>
          </div>
        </div>
      </div>

      <div class="zone zone-droite">
        <div class="zone-droite-haut">
          <div class="joueur">
            <div class="point"></div>
            <div class="nomjoueur">cafwan</div>
          </div>
          <div class="joueur">
            <div class="point"></div>
            <div class="nomjoueur">mohamed</div>
          </div>
        </div>

        <div class="zone-droite-bas">
          <div class="joueur">
            <div class="nomjoueur">redouane</div>
            <div class="point"></div>
          </div>
          <div class="joueur">
            <div class="nomjoueur">younes</div>
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
      dateMatch: '',
      lieuMatch: '',
      equipeA: [],
      equipeB: [],
      joueurs: []
    };
  },
  mounted() {
    this.recupererJoueurs();
  },
  methods: {
    async recupererJoueurs() {
      try {
        const response = await axios.get('http://localhost:3000/api/joueurs');
        this.joueurs = response.data;
      } catch (error) {
        console.error("Erreur lors de la récupération des joueurs", error);
      }
    },
    async creerMatch() {
      try {
        await axios.post('http://localhost:3000/api/matchs', {
          dateMatch: this.dateMatch,
          lieuMatch: this.lieuMatch,
          equipeA: this.equipeA,
          equipeB: this.equipeB
        });
        alert('Match créé avec succès !');
        this.dateMatch = '';
        this.lieuMatch = '';
        this.equipeA = [];
        this.equipeB = [];
      } catch (error) {
        console.error("Erreur lors de la création du match", error);
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
