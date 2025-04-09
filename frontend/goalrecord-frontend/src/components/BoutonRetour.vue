<template>
  <button class="button-53 bg-[#006400] border-0 text-white flex justify-center items-center font-sans text-[1rem] font-bold leading-[1.75rem] p-[0.75rem_1.65rem] relative text-center text-black border-b-2 max-w-[160px] lg:max-w-[460px] w-full cursor-pointer transform rotate-[-2deg] select-none -webkit-select-none touch-manipulation m-2.5 focus:outline-none hover:after:border-white hover:after:bottom-[2px] hover:after:left-[2px] md:p-[0.75rem_3rem] md:text-[1.25rem] sm:text-[0.875rem] sm:p-[0.5rem_1rem]" @click="goBack" role="button">
    Retour
  </button>
</template>

<script>

export default {
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>


.button-53:after {
  content: '';
  position: absolute;
  border: 1px solid #ffffff;
  bottom: 4px;
  left: 4px;
  width: calc(100% - 1px);
  height: calc(100% - 1px);
}

.button-53:hover:after {
  bottom: 2px;
  left: 2px;
}

/*@media (min-width: 768px) {
  .button-53 {
    padding: .75rem 3rem;
    font-size: 1.25rem;
  }
}*/
</style>