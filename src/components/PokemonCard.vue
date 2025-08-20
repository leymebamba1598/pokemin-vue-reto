<template>
  <div class="pokemon-card" :class="getTypeClass">
    <div class="card-header">
      <h3 class="pokemon-name">{{ formatearPrimeraLetra(pokemon.name) }}</h3>
      <span class="pokemon-id">#{{ padId(pokemon.id) }}</span>
    </div>

    <div class="card-image">
      <img 
        :src="pokemon.url_image || '/placeholder-pokemon.png'" 
        :alt="pokemon.name"
        class="pokemon-sprite"
        @error="mostrarImagenError"
      />
    </div>

    <div class="card-types">
      <span 
        v-for="type in pokemon.types" 
        :key="type.slot" 
        class="type-badge"
        :class="'type-' + type.type.name"
      >
        {{ type.type.name }}
      </span>
    </div>

    <div class="card-stats">
      <div class="stat">
        <span class="stat-label">Altura</span>
        <span class="stat-value">{{ (pokemon.height / 10).toFixed(1) }} m</span>
      </div>
      <div class="stat">
        <span class="stat-label">Peso</span>
        <span class="stat-value">{{ (pokemon.weight / 10).toFixed(1) }} kg</span>
      </div>
      <div class="stat">
        <span class="stat-label">EXP</span>
        <span class="stat-value">{{ pokemon.base_experience }}</span>
      </div>
    </div>

    <div class="card-abilities">
      <h4>Habilidades</h4>
      <div class="abilities">
        <span 
          v-for="ability in pokemon.abilities" 
          :key="ability.ability.name"
          class="ability-badge"
        >
          {{ ability.ability.name }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'PokemonCard',
  props: {
    pokemon: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const formatearPrimeraLetra = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const padId = (id) => {
      return id.toString().padStart(3, '0');
    };

    const mostrarImagenError = (event) => {
      event.target.src = '/placeholder-pokemon.png';
    };

    const getTypeClass = computed(() => {
      if (props.pokemon.types && props.pokemon.types.length > 0) {
        return `type-${props.pokemon.types[0].type.name}`;
      }
      return 'type-normal';
    });

    return {
      formatearPrimeraLetra,
      padId,
      mostrarImagenError,
      getTypeClass
    };
  }
}
</script>

<style scoped>
.pokemon-card {
  background: white;
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 3px solid transparent;
}

.pokemon-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.pokemon-name {
  color: #333;
  margin: 0;
  font-size: 1.5rem;
  font-weight: bold;
}

.pokemon-id {
  color: #666;
  font-weight: bold;
  font-size: 1.1rem;
}

.card-image {
  text-align: center;
  margin: 1rem 0;
}

.pokemon-sprite {
  width: 120px;
  height: 120px;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.pokemon-card:hover .pokemon-sprite {
  transform: scale(1.1);
}

.card-types {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  margin: 1rem 0;
}

.type-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  color: white;
  font-size: 0.8rem;
  font-weight: bold;
  text-transform: uppercase;
}

.card-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin: 1rem 0;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 10px;
}

.stat {
  text-align: center;
}

.stat-label {
  display: block;
  font-size: 0.8rem;
  color: #666;
  font-weight: bold;
}

.stat-value {
  display: block;
  font-size: 1rem;
  color: #333;
  font-weight: bold;
}

.card-abilities {
  margin-top: 1rem;
}

.card-abilities h4 {
  margin: 0 0 0.5rem 0;
  color: #333;
  font-size: 1rem;
}

.abilities {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.ability-badge {
  padding: 0.25rem 0.5rem;
  background: #e9ecef;
  border-radius: 12px;
  font-size: 0.8rem;
  color: #495057;
}

/* Colores por tipo Pokémon */
.type-normal { border-color: #a8a878; }
.type-fire { border-color: #f08030; }
.type-water { border-color: #6890f0; }
.type-electric { border-color: #f8d030; }
.type-grass { border-color: #78c850; }
.type-ice { border-color: #98d8d8; }
.type-fighting { border-color: #c03028; }
.type-poison { border-color: #a040a0; }
.type-ground { border-color: #e0c068; }
.type-flying { border-color: #a890f0; }
.type-psychic { border-color: #f85888; }
.type-bug { border-color: #a8b820; }
.type-rock { border-color: #b8a038; }
.type-ghost { border-color: #705898; }
.type-dragon { border-color: #7038f8; }
.type-dark { border-color: #705848; }
.type-steel { border-color: #b8b8d0; }
.type-fairy { border-color: #ee99ac; }

.type-badge.type-normal { background: #a8a878; }
.type-badge.type-fire { background: #f08030; }
.type-badge.type-water { background: #6890f0; }
.type-badge.type-electric { background: #f8d030; }
.type-badge.type-grass { background: #78c850; }
.type-badge.type-ice { background: #98d8d8; }
.type-badge.type-fighting { background: #c03028; }
.type-badge.type-poison { background: #a040a0; }
.type-badge.type-ground { background: #e0c068; }
.type-badge.type-flying { background: #a890f0; }
.type-badge.type-psychic { background: #f85888; }
.type-badge.type-bug { background: #a8b820; }
.type-badge.type-rock { background: #b8a038; }
.type-badge.type-ghost { background: #705898; }
.type-badge.type-dragon { background: #7038f8; }
.type-badge.type-dark { background: #705848; }
.type-badge.type-steel { background: #b8b8d0; }
.type-badge.type-fairy { background: #ee99ac; }
</style>