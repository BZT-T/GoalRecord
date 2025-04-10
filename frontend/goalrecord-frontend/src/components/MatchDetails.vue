<template>
  <div class="md:overflow-hidden md:max-h-screen">
    <BoutonRetour></BoutonRetour>
    <div id="conteneur" class="px-4 gap-4 md:gap-0 md:mt-15 md:px-4 flex justify-evenly flex-col md:flex-row">
      <div id="terrain" class="flex relative md:w-[580px] h-[550px] bg-[#006400] border-2 border-white rounded-lg">
        <div id="zone-transparent-gauche" class="absolute top-0 w-[100px] md:w-[170px] h-full bg-white/20 absolute left-0">

          <div id="zone-transparent-gauche-haut" class="flex flex-col justify-evenly h-[50%]">

            <div id="A1" class="flex flex-col items-center justify-center text-center">
              <div class="w-[35px] h-[35px] md:w-[50px] md:h-[50px] bg-[#59b53f] rounded-full mb-2 shadow-[0_0_10px_rgba(0,0,0,0.2)]"></div>
              <div class="whitespace-nowrap text-[clamp(16px,4vw,26px)] font-bold text-white font-sans capitalize tracking-[1px]">
                {{ getInitials(joueursA[0]?.nom, joueursA[0]?.prenom) }}
              </div>
            </div>

            <div id="A2" class="flex flex-col items-center justify-center text-center">
              <div class="w-[35px] h-[35px] md:w-[50px] md:h-[50px] bg-[#59b53f] rounded-full mb-2 shadow-[0_0_10px_rgba(0,0,0,0.2)]"></div>
              <div class="whitespace-nowrap text-[clamp(16px,4vw,26px)] font-bold text-white font-sans capitalize tracking-[1px]">
                {{ getInitials(joueursA[1]?.nom, joueursA[1]?.prenom) }}
              </div>
            </div>
          </div>

          <div id="zone-transparent-gauche-bas" class="flex flex-col justify-evenly h-[50%]">
            <div id="B1" class="flex flex-col items-center justify-center text-center">
              <div class="whitespace-nowrap text-[clamp(16px,4vw,26px)] font-bold text-white font-sans capitalize tracking-[1px]">
                {{ getInitials(joueursB[0]?.nom, joueursB[0]?.prenom) }}
              </div>
              <div class="w-[35px] h-[35px] md:w-[50px] md:h-[50px] bg-[#59b53f] rounded-full mb-2 shadow-[0_0_10px_rgba(0,0,0,0.2)]"></div>
            </div>
            <div id="B2" class="flex flex-col items-center justify-center text-center">
              <div class="whitespace-nowrap text-[clamp(16px,4vw,26px)] font-bold text-white font-sans capitalize tracking-[1px]">
                {{ getInitials(joueursB[1]?.nom, joueursB[1]?.prenom) }}
              </div>
              <div class="w-[35px] h-[35px] md:w-[50px] md:h-[50px] bg-[#59b53f] rounded-full mb-2 shadow-[0_0_10px_rgba(0,0,0,0.2)]"></div>
            </div>
          </div>
        </div>

        <div id="zone-milieu" class="absolute top-0 left-[100px] right-[100px] md:left-[150px] md:right-[150px] h-full flex flex-col justify-between">
          <div id="surface-haut" class="border-2 border-t-0 border-white flex justify-center absolute top-0 relative w-[90%] md:w-[60%] h-[100px] mx-auto">
            <div id="A3" class="flex flex-col items-center justify-center text-center">
              <div class="w-[35px] h-[35px] md:w-[50px] md:h-[50px] bg-[#59b53f] rounded-full mb-2 shadow-[0_0_10px_rgba(0,0,0,0.2)]"></div>
              <div class="whitespace-nowrap text-[clamp(16px,4vw,26px)] font-bold text-white font-sans capitalize tracking-[1px]">
                {{ getInitials(joueursA[2]?.nom, joueursA[2]?.prenom) }}
              </div>
            </div>
          </div>

          <div class="absolute left-0 top-[35%] text-2xl font-bold uppercase text-white/20 text-center w-full">Equipe A</div>
          <div class="absolute left-0 bottom-[35%] text-2xl font-bold uppercase text-white/20 text-center w-full">Equipe B </div>

          <div id="surface-bas" class="border-2 border-b-0 border-white absolute bottom-0 relative w-[90%] md:w-[60%] h-[100px] mx-auto">

            <div id="B3" class="flex flex-col items-center justify-center text-center">
              <div class="whitespace-nowrap text-[clamp(16px,4vw,26px)] font-bold text-white font-sans capitalize tracking-[1px]">
                {{ getInitials(joueursB[2]?.nom, joueursB[2]?.prenom) }}
              </div>
              <div class="w-[35px] h-[35px] md:w-[50px] md:h-[50px] bg-[#59b53f] rounded-full mb-2 shadow-[0_0_10px_rgba(0,0,0,0.2)]"></div>

            </div>
          </div>
        </div>

        <div id="zone-transparent-droite" class="absolute top-0 w-[100px] md:w-[170px] h-full bg-white/20 absolute right-0">

          <div id="zone-transparent-droite-haut" class="flex flex-col justify-evenly h-[50%] ">
            <div id="A4" class="flex flex-col items-center justify-center text-center">
              <div class="w-[35px] h-[35px] md:w-[50px] md:h-[50px] bg-[#59b53f] rounded-full mb-2 shadow-[0_0_10px_rgba(0,0,0,0.2)]"></div>
              <div class="whitespace-nowrap text-[clamp(16px,4vw,26px)] font-bold text-white font-sans capitalize tracking-[1px]">
                {{ getInitials(joueursA[3]?.nom, joueursA[3]?.prenom) }}
              </div>
            </div>
            <div id="A5" class="flex flex-col items-center justify-center text-center">
              <div class="w-[35px] h-[35px] md:w-[50px] md:h-[50px] bg-[#59b53f] rounded-full mb-2 shadow-[0_0_10px_rgba(0,0,0,0.2)]"></div>
              <div class="whitespace-nowrap text-[clamp(16px,4vw,26px)] font-bold text-white font-sans capitalize tracking-[1px]">
                {{ getInitials(joueursA[4]?.nom, joueursA[4]?.prenom) }}
              </div>
            </div>
          </div>

          <div id="zone-transparent-droite-bas" class="flex flex-col justify-evenly h-[50%]">

            <div id="B4" class="flex flex-col items-center justify-center text-center">
              <div class="whitespace-nowrap text-[clamp(16px,4vw,26px)] font-bold text-white font-sans capitalize tracking-[1px]">
                {{ getInitials(joueursB[3]?.nom, joueursB[3]?.prenom) }}
              </div>
              <div class="w-[35px] h-[35px] md:w-[50px] md:h-[50px] bg-[#59b53f] rounded-full mb-2 shadow-[0_0_10px_rgba(0,0,0,0.2)]"></div>
            </div>

            <div id="B5" class="flex flex-col items-center justify-center text-center">
              <div class="whitespace-nowrap text-[clamp(16px,4vw,26px)] font-bold text-white font-sans capitalize tracking-[1px]">
                {{ getInitials(joueursB[4]?.nom, joueursB[4]?.prenom) }}
              </div>
              <div class="w-[35px] h-[35px] md:w-[50px] md:h-[50px] bg-[#59b53f] rounded-full mb-2 shadow-[0_0_10px_rgba(0,0,0,0.2)]"></div>
            </div>

          </div>
        </div>

        <div id="centre-lvl3" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100px] h-[100px] bg-white/30 rounded-full ">
          <div id="centre-lvl2" class="absolute top-1/2 left-1/2 w-[50px] h-[50px] bg-white/70 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>

        <div id="ligne-centre" class="absolute top-1/2 left-0 w-full h-[2px] bg-white"></div>
        <div id="centre-lvl1" class="absolute top-1/2 left-1/2 w-5 h-5 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>

      </div>

      <div id="information" class="relative md:w-[580px] h-[550px] bg-[url('./assets/styles/img/image-mesh-gradient.png')] rounded-[10px] shadow-[0_4px_10px_rgba(0,0,0,0.1)] p-5 font-sans border-2 border-white">
        <div id="entete-information" class="sticky top-0 bg-black/40 p-2.5 rounded-[8px] shadow-[0_2px_10px_rgba(0,0,0,0.1)] z-[1]">
          <div id="score" class="flex justify-between items-center">
            <span class="text-xl md:text-2xl font-bold text-white uppercase">Équipe A</span>
            <h2 class="text-xl md:text-4xl font-bold mx-4 text-white shadow-md">{{ scoreEquipeA }} - {{ scoreEquipeB }}</h2>
            <span class="text-xl md:text-2xl font-bold text-white uppercase">Équipe B</span>
          </div>
          <p id="ville" class="text-center text-sm text-white mt-1 font-bold">{{ formatDate(dateMatch) }} - {{ lieuMatch }}</p>
        </div>
        <div class="actions-container flex flex-col gap-2.5 max-h-[calc(100%-92px)] overflow-y-scroll">
          <div class="flex items-center justify-center text-xl font-bold text-white my-3.5"><span
              class="flex-1 h-px bg-white mx-2.5"></span>Coup d'envoi<span class="flex-1 h-px bg-white mx-2.5"></span>
          </div>
          <div
              v-for="action in actions"
              :key="action.minute"
              class="flex items-center gap-2 p-2 px-4 rounded-lg text-base bg-gray-100 shadow-sm transition-colors duration-300 ease-in-out"
              :class="{'self-start bg-white pl-4 border-l-4 border-l-green-200': action.equipe === 'A', 'self-end bg-white pr-4 border-r-4 border-r-green-800': action.equipe === 'B'}"
          >
            <span class="font-bold text-black">{{ action.minute }}'</span>
            <span class="font-bold text-black">{{ getInitials(action.buteur.nom, action.buteur.prenom) }}</span>
            <span v-if="action.passeur" class="italic text-gray-500">(Assist: {{
                getInitials(action.passeur.nom, action.passeur.prenom)
              }})</span>
            <span v-if="action.csc" class="ml-2 bg-red-200 text-red-800 text-xs font-bold px-2 py-0.5 rounded">
              (CSC)
            </span>
          </div>
          <div class="flex items-center justify-center text-xl font-bold text-white my-3.5"><span
              class="flex-1 h-px bg-white mx-2.5"></span>Fin du match<span class="flex-1 h-px bg-white mx-2.5"></span>
          </div>
        </div>
      </div>


    </div>
  </div>
</template>

<script>
import apiClient from '@/services/api';
import BoutonRetour from "@/components/BoutonRetour.vue";

export default {
  components: {BoutonRetour},
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
        const response = await apiClient.get(`match/${this.matchId}`);
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
    }
  }
};
</script>

<style scoped>

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

</style>

