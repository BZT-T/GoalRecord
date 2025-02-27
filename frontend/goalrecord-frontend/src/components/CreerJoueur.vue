<template>
  <div class="container">
    <h2>Créer un joueur</h2>
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

      <button type="submit" class="btn">Créer</button>
    </form>
    <div v-if="showToast" class="toast">
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
.container {
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  color: #28a745;
}

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

.btn {
  width: 100%;
  padding: 10px;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.btn:hover {
  background: #218838;
}

.toast {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: opacity 0.5s;
}
</style>
