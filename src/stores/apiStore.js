import { defineStore } from "pinia";
import { ref } from "vue";
import { useFilterStore } from "./filterStore";
import { usePaginationStore } from "./paginationStore";

export const useApiStore = defineStore("api", () => {
    const filterStore = useFilterStore();
    const paginationStore = usePaginationStore();

    const url = ref(`https://rickandmortyapi.com/api/character/`);
    const data = ref([]);
    const dataOfEpisodes = ref([])

    async function getAllCharactersPerPage() {
        try {
            
            filterStore.filter();

            const characters = await fetch(
                `${url.value}?page=${paginationStore.currentPage}${filterStore.queryString}`
            );
  
            data.value = await characters.json();

            paginationStore.maxPages = data.value.info.pages;
        } catch (error) {
            console.log("Ops... " + error);
        }
    }

    async function getCharacterById(id) {
        try {
            const character = await fetch(`${url.value}${id}`);
            data.value = await character.json();
            await getAllEpisodesOfCharacter(data.value.episode);
        } 
        
        catch (error) {
            console.log(error);
        }
    }

    async function getAllEpisodesOfCharacter(episodes) {

        try {

            for (const episode of episodes) {
                const response = await fetch(episode)
                dataOfEpisodes.value.push(await response.json())
            }

        } 
        
        catch (error) {
            console.log(error);
        }
    }

    return {
        data,
        dataOfEpisodes,
        getAllCharactersPerPage,
        getCharacterById,
        getAllEpisodesOfCharacter,
    };
});
