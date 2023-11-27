<template>
    <RouterLink :to="{ name: 'home' }" id="back"> &lt;-- Do you want to back?
    </RouterLink>
    <Suspense>
        <Character />
        <template #fallback>
            <h3> Loading...</h3>
        </template>
    </Suspense>
</template>

<script setup>

import { Suspense } from 'vue';

import Character from '../components/Character.vue';

</script>

<style scoped lang="scss">
#back {
    background-color: $white-color;
    padding: 1rem 2rem;
    // color: $blue-color;
    transition: 0.3s ease-in-out;

    &:hover {
        // background-color: $blue-color;
        color: $white-color;
    }
}
</style>