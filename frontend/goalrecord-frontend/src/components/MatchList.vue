<template>
  <div class="flex flex-wrap gap-1 w-full">
    <div v-for="(groupMatches, monthYear) in matchesGroupedByMonth" :key="monthYear" class="w-full">

      <!-- toggle -->
      <button
          @click="toggleMonth(monthYear)"
          class="mx-0 lg:mx-12 text-white text-3xl font-bold my-4 flex items-center gap-2"
      >
        <span class="uppercase">{{ monthYear }}</span>
        <span
            class="inline-block transition-transform duration-300"
            :class="{ 'rotate-90': openedMonths[monthYear] }"
        >
    ▶
  </span>
      </button>

      <!-- Contenu déroulant -->
      <transition name="fade" mode="out-in">
        <div v-if="openedMonths[monthYear]">
          <div
              v-for="match in groupMatches"
              :key="match.idmatch"
              class="flex flex-col h-auto border-2 border-black rounded-3xl bg-white shadow-lg p-4 transition-transform duration-300 cursor-pointer mx-0 lg:mx-12 hover:scale-101"
              :class="{ 'winner': match.scoreEquipeA > match.scoreEquipeB }"
          >
            <router-link
                :to="{ name: 'matchDetails', params: { id: match.idmatch } }"
                class="match-card-link"
            >
              <div class="flex justify-between items-center">
                <div class="w-20 min-w-[2rem] pr-2.5 border-r border-gray-300 flex justify-center items-center">
                  <div class="text-5xl sm:text-[clamp(0rem,5vw,3rem)] font-bold text-center w-full truncate">
                    {{ match.scoreEquipeA }}
                  </div>
                </div>
                <div>
                  <div class="text-center text-xl font-bold pb-2.5">
                    {{ new Date(match.dateMatch).toLocaleDateString() }}
                  </div>
                  <div class="flex justify-between items-center">
                    <div class="flex flex-col sm:flex-row mb-1.25 team-a-players sm:text-[clamp(0rem,1.4vw,1.5rem)]">
                      <p
                          class="mx-1 my-0.75 italic whitespace-nowrap text-right"
                          v-for="(player, index) in match.joueursA"
                          :key="index"
                      >
                        {{ getInitials(player.nom, player.prenom) }}
                      </p>
                    </div>
                    <div class="text-xl font-bold text-gray-800 px-4">VS</div>
                    <div class="flex flex-col sm:flex-row mb-1.25 team-b-players">
                      <p
                          class="mx-1 my-0.75 transform rotate-[0deg] skew-x-[10deg] whitespace-nowrap text-left sm:text-[clamp(0rem,1.4vw,1.5rem)]"
                          v-for="(player, index) in match.joueursB"
                          :key="index"
                      >
                        {{ getInitials(player.nom, player.prenom) }}
                      </p>
                    </div>
                  </div>
                </div>
                <div class="w-20 min-w-[2rem] pl-2.5 border-l border-gray-300 flex justify-center items-center">
                  <div class="text-5xl sm:text-[clamp(0rem,5vw,3rem)] font-bold text-center w-full truncate">
                    {{ match.scoreEquipeB }}
                  </div>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      matches: [],
      openedMonths: {} // suivi des mois ouverts
    };
  },
  computed: {
    matchesGroupedByMonth() {
      const grouped = {};

      this.matches.forEach(match => {
        const date = new Date(match.dateMatch);
        const key = date.toLocaleString('fr-FR', { month: 'long', year: 'numeric' });

        if (!grouped[key]) {
          grouped[key] = [];
        }

        grouped[key].push(match);
      });

      return grouped;
    }
  },
  mounted() {
    axios.get("http://10.126.4.177:3000/api/matchs")
        .then(response => {
          this.matches = response.data;

          // On attend le rendu pour générer la structure des mois ouverts
          this.$nextTick(() => {
            const initialOpened = {};
            Object.keys(this.matchesGroupedByMonth).forEach(month => {
              initialOpened[month] = true; // ou false pour tout fermé par défaut
            });
            this.openedMonths = initialOpened;
          });
        })
        .catch(error => {
          console.error("Erreur lors de la récupération du classement : ", error);
        });
  },
  methods: {
    getInitials(nom, prenom) {
      return `${nom.charAt(0).toUpperCase()}. ${prenom}`;
    },
    toggleMonth(month) {
      this.openedMonths[month] = !this.openedMonths[month];
    }
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.95);
}
</style>
