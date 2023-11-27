import { defineStore } from "pinia";
import { ref } from "vue";
import { useFilterStore } from "./filterStore";
import { usePaginationStore } from "./paginationStore";

export const useApiStore = defineStore("api", () => {
    const filterStore = useFilterStore();
    const paginationStore = usePaginationStore();

    const baseUrl = ref(`https://rickandmortyapi.com/api`);
    const data = ref([]);
    const dataOfEpisodes = ref(null);

    async function getAllCharactersPerPage() {
        try {
            filterStore.filter();

            const characters = await fetch(
                `${baseUrl.value}/character/?page=${paginationStore.currentPage}${filterStore.queryString}`
            );

            data.value = await characters.json();

            paginationStore.maxPages = data.value.info.pages;
        } catch (error) {
            console.log("Ops... " + error);
        }
    }

    async function getCharacterById(id) {
        try {
            const character = await fetch(`${baseUrl.value}/character/${id}`);
            data.value = await character.json();
            await getAllEpisodesOfCharacter(data.value.episode);
        } catch (error) {
            console.log(error);
        }
    }

    async function getAllEpisodesOfCharacter(episodes) {

        try {

            dataOfEpisodes.value = null

            let seachedEpisodes = ''
            const regex = /[0-9]{1,}/

            episodes.forEach(episode => seachedEpisodes = `${seachedEpisodes.concat(episode.match(regex))},`)

            let response = await fetch(`${baseUrl.value}/episode/${seachedEpisodes.slice(0, -1)}`);
            response = await response.json();

            if(!response.length) { // verify if is array or there's no array, this helps to render the data on the screen
                dataOfEpisodes.value = [response]
                return
            }

            dataOfEpisodes.value = response
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
