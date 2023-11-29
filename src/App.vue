<template>
    <header>
        <h2>
            <a href="/"> Rick and Morty </a>
        </h2>
    </header>
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
        @include flex(center, center, row);
        flex-wrap: wrap;
        gap: 1rem;
        background-color: $black-color;
        padding: 1.6rem;

        a {
            color: $white-color;
        }
       
    }

    main {
        background-color: $mid-white;
        gap: 6rem;
        padding: 4rem 6rem;
        min-height: calc(100vh - 6.2rem);
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

        #wrapper-character {

            padding: 4rem;

            #character {
                justify-content: center;
            }
        }

        #filter-section {
            padding: 2rem;
        }
    }
}

</style>
