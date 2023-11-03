<template>
    <div id="character" v-if="apiStore.data">
        <img :src="apiStore.data.image" :alt="apiStore.data.name">
        <div id="informations">
            <h1> {{ apiStore.data.name }} </h1>
            <p>
                <span> Gender: </span> {{ apiStore.data.gender }}
            </p>
            <p>
                <span> Status: </span> {{ apiStore.data.status }}
            </p>
            <p>
                <span> Location: </span> {{ apiStore.data.location.name }}
            </p>
            <div id="episodes">
                <span> Episodes: </span>
                <div class="episode">
                    <span v-for="episode of apiStore.dataOfEpisodes">
                        {{ episode.name }} - {{ episode.episode }}
                    </span>
                </div>
               
            </div>
        </div>
    </div>
    <h2 v-else> There is no information to display.</h2>
</template>
<script setup>

import { useRoute } from 'vue-router';
import { useApiStore } from '../stores/apiStore';

const apiStore = useApiStore()
const route = useRoute()

await apiStore.getCharacterById(route.params.id)

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
            width: 40rem;
            @include flex(start, center, row);
            gap: 2rem;

            .episode {
                display: grid;
                place-items: center;
                gap: 2rem;
                overflow-y: auto;
                width: 100%;
                height: 16rem;
            }
        }
    }

}
</style>