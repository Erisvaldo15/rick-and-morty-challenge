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
    scroll-behavior: smooth;
}

:root {
    font-size: 62.5%;
}

body {
    font-family: 'Mulish', sans-serif;
    font-size: 1.6rem;
}

*::-webkit-scrollbar {
    width: 1rem;
}

*::-webkit-scrollbar-thumb {
    background: $black-color;
    border-radius: 99rem;
    margin-right: 1rem;
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
        gap: 6rem;
        padding: 4rem 6rem;
        min-height: 100vh;
    }
}

.input,
.control,
button {
    border: none;
}

@media screen and (max-width: 1440px) {
    #app main {
        padding: 0;

        #filter-section {
            padding: 2rem;
        }
    }
}

</style>
