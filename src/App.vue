<template>
    <main>
        <RouterView />
    </main>
</template>

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
    background: linear-gradient(to right, #24243e, #1a1743, #0f0c29);
    color: $white-color;
    font-family: 'Inter', sans-serif;
    font-size: 1.6rem;
    height: 100vh;
}

#app {

    height: 100%;
    @include flex();

    main {
        @include flex(start);
        gap: 6rem;
        padding: 4rem;
        width: 100%;
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