<template>
  <div class="flex flex-col text-white min-h-screen py-5 px-[150px]">
    <h2>Créer un match</h2>

    <div class="form-group">
      <label for="dateMatch">Date du match :</label>
      <input type="date" id="dateMatch" v-model="dateMatch" />
    </div>

    <div class="form-group">
      <label for="lieuMatch">Lieu du match :</label>
      <input type="text" id="lieuMatch" v-model="lieuMatch" placeholder="Ex : Stade municipal" />
    </div>

    <div class="form-group">
      <label for="scoreA">Score Équipe A :</label>
      <input type="number" id="scoreA" v-model.number="scoreEquipeA" min="0" />
    </div>

    <div class="form-group">
      <label for="scoreB">Score Équipe B :</label>
      <input type="number" id="scoreB" v-model.number="scoreEquipeB" min="0" />
    </div>

    <div class="flex flex-col bg-white border border-gray-300 rounded-md">
      <input
          type="text"
          ref="rechercheInput"
          v-model="query"
          @input="rechercherJoueurs"
          placeholder="Rechercher un joueur..."
          class="text-black"
      />
      <ul v-if="joueurs.length > 0">
        <li v-for="joueur in joueurs" :key="joueur.idjoueur" @click="ajouterJoueur(joueur)">
          {{ joueur.nom }} {{ joueur.prenom }}
        </li>
      </ul>
    </div>

    <div class="flex justify-around mt-5">
      <div class="bg-white p-2.5 rounded-lg w-1/2">
        <h3 class="text-center text-black">Équipe A</h3>
        <ul>
          <li v-for="(joueur, index) in equipeA" :key="joueur.idjoueur">
            {{ joueur.nom }} {{ joueur.prenom }}
            <span class="remove" @click="supprimerJoueur('A', index)">❌</span>
          </li>
        </ul>
      </div>

      <div class="bg-white p-2.5 rounded-lg w-1/2">
        <h3 class="text-center text-black">Équipe B</h3>
        <ul>
          <li v-for="(joueur, index) in equipeB" :key="joueur.idjoueur">
            {{ joueur.nom }} {{ joueur.prenom }}
            <span class="remove" @click="supprimerJoueur('B', index)">❌</span>
          </li>
        </ul>
      </div>
    </div>

    <button @click="validerMatch" class="mt-5 p-2.5 bg-green-700 text-white border-none rounded-md cursor-pointer hover:bg-green-600">Créer le match</button>

    <!-- Ajout des buteurs -->
    <div v-if="afficherButeurs" class="buteurs">

      <h2>Ajouter des buteurs</h2>

      <div class="form-group">
        <label>Buteur :</label>
        <select v-model="nouveauBut.buteur">
          <option v-for="joueur in equipeA.concat(equipeB)" :key="joueur.idjoueur" :value="joueur.idjoueur">
            {{ joueur.nom }} {{ joueur.prenom }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label>Passeur (optionnel) :</label>
        <select v-model="nouveauBut.passeur">
          <option value="">Aucun</option>
          <option v-for="joueur in equipeA.concat(equipeB)" :key="joueur.idjoueur" :value="joueur.idjoueur">
            {{ joueur.nom }} {{ joueur.prenom }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label>Minute :</label>
        <input type="number" v-model.number="nouveauBut.minute" min="1" max="90" />
      </div>

      <button @click="ajouterBut" class="mt-5 p-2.5 bg-green-700 text-white border-none rounded-md cursor-pointer hover:bg-green-600">Ajouter But</button>

      <ul>
        <li v-for="(but, index) in buts" :key="index">
          {{ afficherNomJoueur(but.buteur) }}
          ({{ but.minute }}')
          <span v-if="but.passeur">passe de {{ afficherNomJoueur(but.passeur) }}</span>
          <span class="text-red-500 cursor-pointer ml-2.5" @click="supprimerBut(index)">❌</span>
        </li>
      </ul>

      <button @click="validerButs" class="mt-5 p-2.5 bg-green-700 text-white border-none rounded-md cursor-pointer hover:bg-green-600">Valider les buts</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      dateMatch: "",
      lieuMatch: "",
      scoreEquipeA: 0,
      scoreEquipeB: 0,
      query: "",
      joueurs: [],
      equipeA: [],
      equipeB: [],
      idMatch: -1,
      afficherButeurs: false,
      nouveauBut: { buteur: "", passeur: "", minute: null },
      buts: [],
    };
  },
  methods: {
    async rechercherJoueurs() {
      if (this.query.length < 2) {
        this.joueurs = [];
        return;
      }
      try {
        const response = await axios.get(
            `http://localhost:3000/api/recherche-joueurs?query=${this.query}`
        );
        this.joueurs = response.data;
      } catch (error) {
        console.error("Erreur lors de la récupération des joueurs", error);
      }
    },

    ajouterJoueur(joueur) {
      if (this.equipeA.length < 5) {
        this.equipeA.push(joueur);
      } else if (this.equipeB.length < 5) {
        this.equipeB.push(joueur);
      }
      this.query = "";
      this.joueurs = [];
      this.$nextTick(() => {
        this.$refs.rechercheInput.focus();
      });
    },

    supprimerJoueur(equipe, index) {
      if (equipe === "A") {
        this.equipeA.splice(index, 1);
      } else if (equipe === "B") {
        this.equipeB.splice(index, 1);
      }
    },

    async validerMatch() {
      try {
        const response = await axios.post("http://localhost:3000/api/creer-match", {
          dateMatch: this.dateMatch,
          lieuMatch: this.lieuMatch,
          scoreEquipeA: this.scoreEquipeA,
          scoreEquipeB: this.scoreEquipeB,
          equipeA: this.equipeA,
          equipeB: this.equipeB,
        });

        if (response.status === 201) {
          this.idMatch = response.data.idmatch;
          this.afficherButeurs = true;
          alert("Match enregistré avec succès !");
        }
      } catch (error) {
        console.error("Erreur lors de la validation du match", error);
      }
    },

    ajouterBut() {
      if (!this.nouveauBut.buteur || !this.nouveauBut.minute) {
        alert("Veuillez sélectionner un buteur et une minute.");
        return;
      }
      this.buts.push({ ...this.nouveauBut });
      this.nouveauBut = { buteur: "", passeur: "", minute: null };
    },

    supprimerBut(index) {
      this.buts.splice(index, 1);
    },

    async validerButs() {
      try {
        await axios.post("http://localhost:3000/api/ajouter-buts", {
          idMatch: this.idMatch,
          buts: this.buts,
        });
        alert("Buts enregistrés !");
      } catch (error) {
        console.error("Erreur lors de l'enregistrement des buts", error);
      }
    },

    afficherNomJoueur(id) {
      const joueur = this.equipeA.concat(this.equipeB).find(j => j.idjoueur === id);
      return joueur ? `${joueur.nom} ${joueur.prenom}` : "Inconnu";
    }
  }
};
</script>

<style scoped>

h2 {
  text-align: center;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}

input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  padding: 5px;
  cursor: pointer;
  color: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

li:hover {
  background-color: #f0f0f0;
}

</style>
