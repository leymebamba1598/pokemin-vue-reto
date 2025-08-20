import axios from 'axios';

//const API_BASE_URL = 'http://localhost:8021/api/v1/';
const API_BASE_URL ="https://pokemon-reto.onrender.com/api/v1"

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
});

export const pokemonService = {
    // Obtener lista de Pokémon
    getPokemons: async (limit = 10, offset = 0) => {
        try {
            const response = await api.get(`pokemon/foto?limit=${limit}&offset=${offset}`);
            return response.data;
        } catch (error) {
            console.error('Error consulta pokemons:', error);
            throw error;
        }
    },

    // Obtener Pokémon por ID
    getPokemonById: async (id) => {
        try {
            const response = await api.get(`/pokemon/id/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error consultando pokemon por ID:', error);
            throw error;
        }
    },

    // Obtener Pokémon por nombre
    getPokemonByName: async (name) => {
        try {
            const response = await api.get(`/pokemon/name/${name}`);
            return response.data;
        } catch (error) {
            console.error('Error consultando pokemon por nombre:', error);
            throw error;
        }
    },
};

export default api;