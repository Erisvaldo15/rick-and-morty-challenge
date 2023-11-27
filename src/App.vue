<template>
    <header>
        <h2>Rick And Morty</h2>
        <Search />
    </header>
    <main>
        <RouterView />
    </main>
</template>

<script setup>
import Search from './components/Search.vue';
</script>

<style lang="scss">
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    text-decoration: none;
}

:root {
    font-size: 62.5%;
}

body {
    font-family: 'Mulish', sans-serif;
    font-size: 1.6rem;
}

#app {

    header {
        @include flex(space-evenly, center, row);
        flex-wrap: wrap;
        gap: 1rem;
        background-color: $black-color;
        padding: 1.6rem;
        color: $white-color;
    }

    main {
        background-color: $mid-white;
        @include flex(start);
        gap: 6rem;
        padding: 4rem;
        height: calc(100vh - 8.2rem);
    }

    *::-webkit-scrollbar {
        width: 1rem;
    }

    *::-webkit-scrollbar-thumb {
        background: $white-color;
        border-radius: 99rem;
        margin-right: 1rem;
    }
}

.input,
.control,
button {
    border: none;
}
</style>
