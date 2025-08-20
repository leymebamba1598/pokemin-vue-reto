<template>
  <div class="search-container">
    <div class="search-box">
      <input
        v-model="pokemonNombre"
        @keyup.enter="buscarPokemon"
        type="text"
        placeholder="Busca un Pokémon por nombre..."
        class="search-input"
      />
      <button @click="buscarPokemon" class="search-button">🔍 </button>
      <button @click="getPokemons" class="show-all-button">Listar todos</button>
    </div>
  </div>

  <div class="pokemon-list">
    <div class="list-controls" v-if="totalCount != 0">
      <button
        v-if="totalCount !== 1"
        @click="previaPagina"
        :disabled="offset === 0"
        class="nav-button"
      >
        ← Anterior
      </button>

      <span class="page-info">
        Página {{ numeroPagina }} - Mostrando {{ pokemons.length }} Pokémon
      </span>

      <button
        v-if="totalCount !== 1"
        @click="siguientePagina"
        class="nav-button"
      >
        Siguiente →
      </button>
    </div>

    <div v-if="loading" class="loading">
      <div class="loading-spinner"></div>
      <p>Cargando Pokémon...</p>
    </div>

    <div v-else-if="error" class="error">
      {{ error }}
    </div>

    <div v-else class="pokemon-grid">
      <PokemonCard
        v-for="pokemon in pokemons"
        :key="pokemon.id"
        :pokemon="pokemon"
      />
    </div>

    <div v-if="totalCount !== 0">
      <div v-if="totalCount !== 1" class="list-controls">
        <button
          @click="previaPagina"
          :disabled="offset === 0"
          class="nav-button"
        >
          ← Anterior
        </button>

        <span class="page-info"> Página {{ numeroPagina }} </span>

        <button @click="siguientePagina" class="nav-button">Siguiente →</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { pokemonService } from "@/services/api";
import PokemonCard from "./PokemonCard.vue";

export default {
  name: "PokemonList",
  components: {
    PokemonCard,
  },
  setup() {
    const pokemons = ref([]);
    const loading = ref(true);
    const error = ref("");
    const offset = ref(0);
    const limit = ref(10);
    const totalCount = ref(0);
    const pokemonNombre = ref("");

    const numeroPagina = computed(
      () => Math.floor(offset.value / limit.value) + 1
    );

    const getPokemons = async () => {
      loading.value = true;
      error.value = "";

      try {
        const data = await pokemonService.getPokemons(
          limit.value,
          offset.value
        );
        console.log("Pokemons lista:", data);
        totalCount.value = data.length;

        pokemons.value = data;
      } catch (err) {
        error.value = "Error al cargar los Pokémon";
        console.error("Error fetching pokemons:", err);
      } finally {
        loading.value = false;
      }
    };

    const buscarPokemon = async () => {
      if (!pokemonNombre.value.trim()) return;
      loading.value = true;
      error.value = "";
      // searchResult.value = null;
      try {
        const result = await pokemonService.getPokemonByName(
          pokemonNombre.value.toLowerCase()
        );
        totalCount.value = 1;
        pokemons.value = [result];
      } catch (err) {
        error.value = "Pokémon no encontrado. Intenta con otro nombre o ID.";
        console.error("Search error:", err);
        totalCount.value = 0;
      } finally {
        loading.value = false;
      }
    };

    const siguientePagina = () => {
      offset.value += limit.value;
      getPokemons();
      window.scrollTo(0, 0);
    };

    const previaPagina = () => {
      if (offset.value > 0) {
        offset.value = Math.max(0, offset.value - limit.value);
        getPokemons();
        window.scrollTo(0, 0);
      }
    };

    onMounted(() => {
      // ciclo de vida
      getPokemons();
    });

    return {
      pokemons,
      loading,
      error,
      offset,
      limit,
      totalCount,
      numeroPagina,
      pokemonNombre,
      siguientePagina,
      previaPagina,
      buscarPokemon,
      getPokemons
    };
  },
};
</script>

<style scoped>
.pokemon-list {
  margin: 2rem 0;
}

.list-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 2rem 0;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 10px;
}

.nav-button {
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #ff0000 0%, #cc0000 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: opacity 0.3s ease;
}

.nav-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.nav-button:hover:not(:disabled) {
  opacity: 0.9;
}

.page-info {
  font-weight: bold;
  color: #333;
}

.loading {
  text-align: center;
  padding: 3rem;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #ff0000;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.error {
  background: #ffe6e6;
  color: #cc0000;
  padding: 2rem;
  border-radius: 10px;
  text-align: center;
  border-left: 4px solid #cc0000;
}

.pokemon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
}

@media (max-width: 768px) {
  .pokemon-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
  }

  .list-controls {
    flex-direction: column;
    gap: 1rem;
  }
}

/* estylos para el buscador */

.search-container {
  margin-bottom: 2rem;
}

.show-all-button {
  background-color: #2ecc71;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 15px 20px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.3s;
  /* width: 100%; */
}

.search-box {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  max-width: 800px;
}

.search-input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.3s ease;
}

.search-input:focus {
  border-color: #ff0000;
}

.search-button {
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #ff0000 0%, #cc0000 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.search-button:hover {
  transform: translateY(-2px);
}

.loading {
  text-align: center;
  padding: 2rem;
  color: #666;
}

.error {
  background: #ffe6e6;
  color: #cc0000;
  padding: 1rem;
  border-radius: 8px;
  margin: 1rem 0;
  border-left: 4px solid #cc0000;
}

.search-result {
  margin-top: 2rem;
}

.search-result h3 {
  color: #333;
  margin-bottom: 1rem;
  font-size: 1.5rem;
}
</style>