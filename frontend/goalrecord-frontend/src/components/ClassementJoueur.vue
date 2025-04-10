<template>
  <div class="overflow-hidden"> <!-- c'est le qui doit prendre l'espace restant-->
    <div class="flex flex-col items-center text-white min-h-screen">
      <div class="table-container max-h-[450px] lg:max-h-[500px] overflow-y-auto lg:w-4/5 w-95/100 bg-[rgba(0,0,0,0.3)] rounded-[10px] shadow-lg">
        <table class="w-full border-collapse text-white">
          <thead>
          <tr>
            <th class="p-0 lg:p-3 text-center align-middle border-b-2 border-white text-[1rem] lg:text-[1.7rem] sticky top-0 bg-[#006400] z-10 shadow-lg">Position</th>
            <th class="p-0 lg:p-3 text-center align-middle border-b-2 border-white text-[1rem] lg:text-[1.7rem] sticky top-0 bg-[#006400] z-10 shadow-lg">Joueur</th>
            <th class="p-0 lg:p-3 text-center align-middle border-b-2 border-white text-[1rem] lg:text-[1.7rem] sticky top-0 bg-[#006400] z-10 shadow-lg">Matchs</th>
            <th class="p-0 lg:p-3 text-center align-middle border-b-2 border-white text-[1rem] lg:text-[1.7rem] sticky top-0 bg-[#006400] z-10 shadow-lg">Buts</th>
            <th class="p-0 lg:p-3 text-center align-middle border-b-2 border-white text-[1rem] lg:text-[1.7rem] sticky top-0 bg-[#006400] z-10 shadow-lg">Passes D.</th>
            <th class="p-0 lg:p-3 text-center align-middle border-b-2 border-white text-[1rem] lg:text-[1.7rem] sticky top-0 bg-[#006400] z-10 shadow-lg">GA/A</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(joueur, index) in joueurs" :key="index" :class="getPositionClass(index)">
            <td class="p-2 lg:p-3 text-center align-middle border-b border-white  text-[1rem] lg:text-[1.5rem] bg-[rgba(213,246,213,0.47)]">
                  <span>
                  <span v-if="index === 0">🥇</span>
                  <span v-else-if="index === 1">🥈</span>
                  <span v-else-if="index === 2">🥉</span>
                  <span v-else>{{ index + 1 }}</span>
                </span>
            </td>
            <td class="p-2 lg:p-3 text-center align-middle border-b border-white text-[1rem] lg:text-[1.5rem] bg-[rgba(213,246,213,0.47)]">{{ getInitials(joueur.nom, joueur.prenom) }}</td>
            <td class="p-2 lg:p-3 text-center align-middle border-b border-white text-[1rem] lg:text-[1.5rem] bg-[rgba(213,246,213,0.47)]">{{ joueur.nbMatch }}</td>
            <td class="p-2 lg:p-3 text-center align-middle border-b border-white text-[1rem] lg:text-[1.5rem] bg-[rgba(213,246,213,0.47)]">{{ joueur.nbBut }}</td>
            <td class="p-2 lg:p-3 text-center align-middle border-b border-white text-[1rem] lg:text-[1.5rem] bg-[rgba(213,246,213,0.47)]">{{ joueur.nbPasseD }}</td>
            <td class="p-2 lg:p-3 text-center align-middle border-b border-white text-[1rem] lg:text-[1.5rem] bg-[rgba(213,246,213,0.47)]">{{ getGoalAssistAverage(joueur.nbBut, joueur.nbPasseD, joueur.nbMatch) }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>


<script>
import apiClient from '@/services/api';

export default {
  name: "ClassementJoueur",
  components: {},
  data() {
    return {
      joueurs: []  // Liste vide qui sera remplie avec les joueurs venant du serveur
    };
  },
  mounted() {
    apiClient.get('classement')
        .then(response => {
          this.joueurs = response.data;
          console.log(this.joueurs);
        })
        .catch(error => {
          console.error("Erreur lors de la récupération du classement : ", error);
        });
  },
  methods: {
    getInitials(nom, prenom) {
      return `${nom.charAt(0).toUpperCase()}. ${prenom}`;
    },
    getGoalAssistAverage(nbBut, nbPasse, nbMatch) {
      return nbMatch === 0 ? 0 : ((+nbBut + +nbPasse) / nbMatch).toFixed(2);
    },
    getPositionClass(index) {
      if (index === 0) {
        return "bg-[rgba(255,250,0,0.67)] text-black font-bold";
      } else if (index === 1) {
        return "bg-[rgba(192,192,192,0.67)] text-black font-bold";
      } else if (index === 2) {
        return "bg-[rgba(205,127,50,0.67)] text-black font-bold";
      }
      return '';
    }
  }
};
</script>

<style scoped>

.table-container::-webkit-scrollbar {
  width: 8px;
}

.table-container::-webkit-scrollbar-track {
  background: transparent;
}

.table-container::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
}

.table-container::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.8);
}
</style>
