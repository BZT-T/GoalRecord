<template>
  <div class="flex flex-wrap gap-4 w-full">
    <div v-for="match in matches" :key="match.idmatch" class="flex flex-col w-full h-auto border-2 border-black rounded-3xl bg-white shadow-lg p-4 transition-transform duration-300 cursor-pointer mx-0 lg:mx-12 mb-2.5 hover:scale-101"
         :class="{'winner': match.scoreEquipeA > match.scoreEquipeB}">
      <router-link :to="{ name: 'matchDetails', params: { id: match.idmatch } }" class="match-card-link">
        <div class="flex justify-between items-center">
          <div class="pr-2.5 border-r border-gray-300">

            <div class="text-5xl font-bold">{{ match.scoreEquipeA }}</div>
          </div>
          <div>
            <div class="text-center text-xl font-bold pb-2.5">{{ new Date(match.dateMatch).toLocaleDateString() }}</div>
            <div class="flex justify-between items-center">

              <!-- Nom des joueurs équipe A (horizontalement sur grands écrans, verticalement sur mobile) -->
              <div class="flex flex-col sm:flex-row text-lg mb-1.25 team-a-players">
                <p class="mx-1 my-0.75 italic whitespace-nowrap text-right" v-for="(player, index) in match.joueursA" :key="index">{{ getInitials(player.nom, player.prenom) }}</p>
              </div>

              <!-- Séparateur VS -->
              <div class="text-xl font-bold text-gray-800 px-4">VS</div>

              <!-- Nom des joueurs équipe B (verticalement sur mobile, horizontalement sur les écrans plus grands) -->
              <div class="flex flex-col sm:flex-row text-lg mb-1.25 team-b-players">
                <p class="mx-1 my-0.75 transform rotate-[0deg] skew-x-[10deg] whitespace-nowrap text-left" v-for="(player, index) in match.joueursB" :key="index">{{ getInitials(player.nom, player.prenom) }}</p>
              </div>

            </div>
          </div>
          <div class="pl-2.5 border-l border-gray-300">
            <div class="text-5xl font-bold">{{ match.scoreEquipeB }}</div>
          </div>
        </div>
      </router-link>
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
