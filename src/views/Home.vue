<script setup>

import { Suspense } from 'vue';

import Search from '../components/Search.vue';
import Filter from '../components/Filter.vue';
import CharactersList from '../components/CharactersList.vue';
import Pagination from '../components/Pagination.vue'

</script>

<template>
    <div class="container">
        <Suspense>
            <CharactersList />
            <template #fallback>
                <h2> Loading </h2>
            </template>
        </Suspense>
    </div>
    <Pagination />
</template>

<style lang="scss">

.container {
    height: 50rem;
    overflow: auto;
}

</style>