<template>
  <div class="flex flex-col text-white min-h-screen px-4 lg:px-[150px] py-8 space-y-6">
    <h2 class="text-3xl font-bold text-center mb-4">Créer un match</h2>

    <!-- Formulaire principal -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="form-group flex flex-col">
        <label for="dateMatch" class="mb-1 font-semibold">Date du match :</label>
        <input type="date" id="dateMatch" v-model="dateMatch" class="input" />
      </div>

      <div class="form-group flex flex-col">
        <label for="lieuMatch" class="mb-1 font-semibold">Lieu du match :</label>
        <input type="text" id="lieuMatch" v-model="lieuMatch" placeholder="Ex : Stade municipal" class="input" />
      </div>

      <div class="form-group flex flex-col">
        <label for="scoreA" class="mb-1 font-semibold">Score Équipe A :</label>
        <input type="number" id="scoreA" v-model.number="scoreEquipeA" min="0" class="input" />
      </div>

      <div class="form-group flex flex-col">
        <label for="scoreB" class="mb-1 font-semibold">Score Équipe B :</label>
        <input type="number" id="scoreB" v-model.number="scoreEquipeB" min="0" class="input" />
      </div>
    </div>

    <!-- Recherche de joueurs -->
    <div class="bg-white p-4 rounded-md shadow-md text-black">
      <input
          type="text"
          ref="rechercheInput"
          v-model="query"
          @input="rechercherJoueurs"
          placeholder="Rechercher un joueur..."
          class="w-full mb-2 px-3 py-2 rounded border border-gray-300"
      />
      <ul v-if="joueurs.length > 0" class="max-h-40 overflow-y-auto">
        <li
            v-for="joueur in joueurs"
            :key="joueur.idjoueur"
            @click="ajouterJoueur(joueur)"
            class="px-3 py-1 hover:bg-gray-200 cursor-pointer rounded"
        >
          {{ joueur.nom }} {{ joueur.prenom }}
        </li>
      </ul>
    </div>

    <!-- Équipes -->
    <div class="flex flex-col md:flex-row gap-6">
      <div class="bg-white p-4 rounded-lg w-full text-black">
        <h3 class="text-center font-semibold text-lg mb-2">Équipe A</h3>
        <ul class="space-y-1">
          <li v-for="(joueur, index) in equipeA" :key="joueur.idjoueur" class="flex justify-between items-center">
            <span>{{ joueur.nom }} {{ joueur.prenom }}</span>
            <span class="cursor-pointer text-red-600 hover:text-red-800" @click="supprimerJoueur('A', index)">❌</span>
          </li>
        </ul>
      </div>

      <div class="bg-white p-4 rounded-lg w-full text-black">
        <h3 class="text-center font-semibold text-lg mb-2">Équipe B</h3>
        <ul class="space-y-1">
          <li v-for="(joueur, index) in equipeB" :key="joueur.idjoueur" class="flex justify-between items-center">
            <span>{{ joueur.nom }} {{ joueur.prenom }}</span>
            <span class="cursor-pointer text-red-600 hover:text-red-800" @click="supprimerJoueur('B', index)">❌</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- Bouton création de match -->
    <button
        @click="validerMatch"
        class="self-center w-full md:w-auto px-6 py-3 bg-green-700 hover:bg-green-600 rounded-md text-white font-semibold transition"
    >
      Créer le match
    </button>

    <!-- Ajout des buteurs -->
    <div v-if="afficherButeurs" class="bg-white p-6 rounded-lg text-black shadow-md">
      <h2 class="text-xl font-bold mb-4">Ajouter des buteurs</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="form-group flex flex-col">
          <label class="mb-1 font-semibold">Buteur :</label>
          <select v-model="nouveauBut.buteur" class="input">
            <option v-for="joueur in equipeA.concat(equipeB)" :key="joueur.idjoueur" :value="joueur.idjoueur">
              {{ joueur.nom }} {{ joueur.prenom }}
            </option>
          </select>
        </div>

        <div class="form-group flex flex-col">
          <label class="mb-1 font-semibold">Passeur (optionnel) :</label>
          <select v-model="nouveauBut.passeur" class="input">
            <option value="">Aucun</option>
            <option v-for="joueur in equipeA.concat(equipeB)" :key="joueur.idjoueur" :value="joueur.idjoueur">
              {{ joueur.nom }} {{ joueur.prenom }}
            </option>
          </select>
        </div>

        <div class="form-group flex items-center gap-2 mt-2 col-span-full">
          <input type="checkbox" id="csc" v-model="nouveauBut.csc" class="w-4 h-4">
          <label for="csc" class="cursor-pointer font-medium">Contre son camp</label>
        </div>

        <div class="form-group flex flex-col col-span-full">
          <label class="mb-1 font-semibold">Minute :</label>
          <input type="number" v-model.number="nouveauBut.minute" min="1" max="90" class="input" />
        </div>
      </div>

      <button
          @click="ajouterBut"
          class="mt-4 px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md transition font-semibold"
      >
        Ajouter But
      </button>

      <ul class="mt-4 space-y-2">
        <li v-for="(but, index) in buts" :key="index">
          {{ afficherNomJoueur(but.buteur) }} ({{ but.minute }}')
          <span v-if="but.passeur"> - passe de {{ afficherNomJoueur(but.passeur) }}</span>
          <span class="text-red-500 cursor-pointer ml-2.5 hover:text-red-700" @click="supprimerBut(index)">❌</span>
        </li>
      </ul>

      <button
          @click="validerButs"
          class="mt-4 px-6 py-2 bg-green-700 hover:bg-green-600 text-white rounded-md font-semibold transition"
      >
        Valider les buts
      </button>
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
      nouveauBut: { buteur: "", passeur: "", minute: null, csc: false },
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
        }
      } catch (error) {
        alert("Match non enregistré !");
        console.error("Erreur lors de la validation du match", error);
      }
    },

    ajouterBut() {
      if (!this.nouveauBut.buteur || !this.nouveauBut.minute) {
        alert("Veuillez sélectionner un buteur et une minute.");
        return;
      }
      this.buts.push({ ...this.nouveauBut });
      this.nouveauBut = { buteur: "", passeur: "", minute: null, csc: false };
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
      } catch (error) {
        alert("Buts non enregistrés !");
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

.input {
  @apply px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500;
}
</style>
