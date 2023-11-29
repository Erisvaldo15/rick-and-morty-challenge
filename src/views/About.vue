<template>
    <div id="wrapper-character">
        <Suspense>
            <Character />
            <template #fallback>
                <h3>Loading...</h3>
            </template>
        </Suspense>
    </div>
</template>

<script setup>
import { Suspense } from 'vue';

import Character from '../components/Character.vue';
</script>

<style scoped lang="scss">

#app, main {
    padding: 0;
}

#wrapper-character {
    @include flex(center, center, row);
    flex-wrap: wrap;
    min-height: calc(100vh - 14.2rem);
}

</style>
