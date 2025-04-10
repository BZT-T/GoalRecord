<template>
  <div class="w-[800px] mx-auto my-5 p-5 bg-[#f8f9fa] rounded-lg shadow-lg">
    <h2 class="text-center text-[#28a745]">Créer un joueur</h2>
    <form @submit.prevent="creerJoueur">
      <div class="form-group">
        <label for="nom">Nom :</label>
        <input type="text" id="nom" v-model="joueur.nom" required />
      </div>

      <div class="form-group">
        <label for="prenom">Prénom :</label>
        <input type="text" id="prenom" v-model="joueur.prenom" required />
      </div>

      <div class="form-group">
        <label for="age">Âge :</label>
        <input type="number" id="age" v-model.number="joueur.age" required min="10" />
      </div>

      <button type="submit" class="w-full p-2.5 bg-[#28a745] text-white border-none rounded-md cursor-pointer text-lg hover:bg-[#218838]">Créer</button>
    </form>
    <div v-if="showToast" class="fixed bottom-5 right-5 bg-[#4CAF50] text-white p-2.5 px-5 rounded-lg shadow-lg transition-opacity duration-500">
      {{ toastMessage }}
    </div>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      joueur: {
        nom: '',
        prenom: '',
        age: ''
      },
      showToast: false,
      toastMessage: ""
    };
  },
  methods: {
    creerJoueur: async function () {
      try {
        await axios.post('http://localhost:3000/api/Creerjoueur', this.joueur);
        this.showToastMessage("Joueur ajouté avec succès !");
        this.joueur = {nom: '', prenom: '', age: ''}; // Réinitialisation du formulaire
      } catch (error) {
        console.error('Erreur lors de la création du joueur', error);
        this.showToastMessage("Erreur lors de l'ajout du joueur !");
      }
    },
    showToastMessage(message) {
      this.toastMessage = message;
      this.showToast = true;
      setTimeout(() => {
        this.showToast = false;
      }, 3000); // Disparait après 3 secondes
    }
  }
};
</script>

<style scoped>

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input {
  width: 96%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
