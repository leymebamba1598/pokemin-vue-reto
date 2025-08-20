<template>
  <div class="home">
    <PokemonList />
  </div>
</template>

<script>
import PokemonList from '@/components/PokemonList.vue';

export default {
  name: 'HomeView',
  components: {
    PokemonList
  }
}
</script>

<style scoped>
.home {
  padding: 1rem 0;
}
</style>