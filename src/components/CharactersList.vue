<template>
    <template v-if="apiStore.data.results">
        <div class="character" v-for="character in apiStore.data.results">
            <img :src="character.image" alt="Character image" />
            <div class="character-description">
                <h3>{{ character.name }}</h3>
                <RouterLink
                    :to="{ name: 'about', params: { id: character.id } }"
                    class="more-details">
                    More Details
                </RouterLink>
            </div>
        </div>
    </template>
    <template v-else>
        <h2>{{ apiStore.data.error }}.</h2>
    </template>
</template>

<script setup>
import { useApiStore } from '../stores/apiStore';

const apiStore = useApiStore();

await apiStore.getAllCharactersPerPage();
</script>

<style lang="scss">
.character {
    max-width: 35rem;
    width: 100%;
    background-color: $white-color;
    border-radius: 0.8rem;
    box-shadow: 0 1rem 1.6rem 0 rgba(22, 22, 22, 0.1);

    img {
        width: 100%;
        border-radius: 1rem;
    }

    .character-description {
        padding: 2.269rem;

        h3 {
            margin-bottom: 2.2rem;
        }

        .more-details {
            background-color: $black-color;
            color: $white-color;
            padding: 1rem;

            &:hover {
                background-color: $white-color;
                color: $black-color;
                transition: 0.25s ease-in-out;
            }
        }
    }
}
</style>
