import { defineStore } from "pinia";
import { ref } from "vue";
import { useFilterStore } from "./filterStore";
import { usePaginationStore } from "./paginationStore";

export const useApiStore = defineStore("api", () => {

    interface CharacterInfo {
        id: number,
        name: string,
        image: string,
        gender: string,
        status: string,
        episode: string[],
        location: {
            name: string,
        }
    }

    interface ApiResponse {
        info: {
            pages: number
        },
        results: CharacterInfo[],
    }

    const filterStore = useFilterStore();
    const paginationStore = usePaginationStore();

    const baseUrl: string = `https://rickandmortyapi.com/api`;
    const data = ref<ApiResponse>({ info: { pages: 1 }, results: [] });
    const chosenCharacter = ref<CharacterInfo | null>(null);
    const episodesData = ref<object[]>([]);

    async function getAllCharactersPerPage(): Promise<void> {

        try {
            filterStore.filter();
            const characters = await fetch(`${baseUrl}/character/?page=${paginationStore.currentPage}${filterStore.queryString}`);
            data.value = await characters.json();
            paginationStore.maxPages = data.value.info.pages ?? 1;
        }
        catch (error) {
            console.log(`Ops... there's nothing character. Error: ${error}`);
        }
    }

    async function getCharacterById(characterId: number): Promise<void> {
        try {
            const character = await fetch(`${baseUrl}/character/${characterId}`);
            chosenCharacter.value = await character.json();
            if(chosenCharacter.value) await getAllEpisodesOfCharacter(chosenCharacter.value.episode);
        }
        catch (error: any) {
            console.log(error);
        }
    }
    async function getAllEpisodesOfCharacter(episodesUrl: string[]) {

        try {

            let mappedEpisodes: (string | null)[] = episodesUrl.map((episodeUrl: string) => {
                const match: RegExpMatchArray | null = episodeUrl.match(/[0-9]{1,}/);
                if(match) return match[0];
                return null;
            });

            let response: Response = await fetch(`${baseUrl}/episode/${mappedEpisodes.join()}`);
            const data: object | object[] = await response.json();

            if (!Array.isArray(data)) { 
                episodesData.value = [data];
                return;
            }
            
            episodesData.value = data;
        }
        catch (error) {
            console.log(error);
        }
    }
    return {
        data,
        episodesData,
        getAllCharactersPerPage,
        getCharacterById,
        getAllEpisodesOfCharacter,
    };
});