<template>
    <div id="character" v-if="apiStore.chosenCharacter">
        <img :src="apiStore.chosenCharacter.image" :alt="apiStore.chosenCharacter.name" />
        <div id="informations">
            <h1>{{ apiStore.chosenCharacter.name }}</h1>
            <p><span> Gender: </span> {{ apiStore.chosenCharacter.gender }}</p>
            <p><span> Status: </span> {{ apiStore.chosenCharacter.status }}</p>
            <p><span> Location: </span> {{ apiStore.chosenCharacter.location.name }}</p>
            <div id="episodes">
                <span> Episodes ({{ apiStore.episodesData.length }}): </span>
                <div class="episode" v-for="episode of apiStore.episodesData">
                    <p> 
                        Episode name: {{ episode.name }}
                    </p> 
                    <p> 
                        Episode number: {{ episode.episode }}
                    </p>
                </div>
            </div>
        </div>
    </div>
    <h2 v-else>There is no information to display.</h2>
</template>
<script setup>
import { useRoute } from 'vue-router';
import { useApiStore } from '../stores/apiStore';

const apiStore = useApiStore();
const route = useRoute();

await apiStore.getCharacterById(route.params.id);
</script>

<style lang="scss" scoped>
#character {
    max-width: 90rem;
    width: 100%;
    gap: 2rem;
    @include flex(space-between, center, row);
    flex-wrap: wrap;
    animation: show 1s ease-in-out;

    img {
        max-width: 100%;
        clip-path: circle();
    }

    #informations {
        p,
        div#episodes {
            font-weight: 300;
            margin-top: 2rem;
            font-size: 2rem;
        }

        span {
            font-weight: 700;
        }

        #episodes {
            max-width: 40rem;
            height: 25rem;
            @include flex(start, center);
            overflow-y: auto;
            gap: 2rem;

            .episode {
                background-color: $black-color;
                color: $white-color;
                width: 100%;
                max-height: 20rem;
                padding: 2rem;

                p:first-child {
                    margin-top: 0;
                }
            }
        }
    }
}
</style>
