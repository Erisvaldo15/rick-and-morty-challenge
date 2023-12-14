<script setup>
import { Suspense } from 'vue';

import Search from '../components/Search.vue';
import Filter from '../components/Filter.vue';
import CharactersList from '../components/CharactersList.vue';
import Pagination from '../components/Pagination.vue';

</script>

<template>
    <div id="filter-section">
        <Search />
        <Filter />
    </div>
    <div id="characters">
        <Suspense>
            <CharactersList />
            <template #fallback>
                <h2>Loading</h2>
            </template>
        </Suspense>
    </div>
    <Pagination />
</template>

<style lang="scss">

#filter-section {
    @include flex(center, center, row);
    flex-wrap: wrap;
    gap: 2rem;
    
    h3 {
        font-size: 2.4rem;
        text-transform: capitalize;
    }
}

#characters {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(25rem, 1fr));
    justify-items: center;
    gap: 2.22rem;
    margin-top: 3.6rem;
    height: 100%;
    padding: 2rem;
}
</style>