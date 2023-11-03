<template>
    <table v-if="apiStore.data.results">
        <thead>
            <th> id </th>
            <th> image </th>
            <th> name </th>
            <th> specie </th>
            <th> Details</th>
        </thead>

        <tbody>
            <tr v-for="character in apiStore.data.results">
                <td> {{ character.id }} </td>
                <td>
                    <img :src="character.image" alt="">
                </td>
                <td> {{ character.name }} </td>
                <td> {{ character.species }} </td>
                <td>
                    <RouterLink :to="{ name: 'about', params: { id: character.id } }" class="more-details"> More Details
                    </RouterLink>
                </td>
            </tr>
        </tbody>
    </table>
    <template v-else>
        <h2> {{ apiStore.data.error }}</h2>
    </template>
</template>

<script setup>

import { useApiStore } from '../stores/apiStore';

const apiStore = useApiStore()

await apiStore.getAllCharactersPerPage()

</script>

<style lang="scss">
table {
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    border: none;
    text-align: center;
    overflow: auto;

    thead {
        box-shadow: 0 0.05rem 1rem rgb(33, 33, 33);

        th {
            padding: 1rem 2rem;
            text-transform: uppercase;
        }
    }

    tbody {

        td {
            padding: 4rem 2rem;

            img {
                width: 15rem;
                height: 15rem;
                clip-path: circle();
                object-fit: contain;
            }

            a.more-details {
                background-color: $white-color;
                color: $blue-color;
                padding: 1rem;
                border-radius: 0.5rem;
                border: none;
                transition: 0.3s ease-in-out;

                &:hover {
                    background-color: $blue-color;
                    color: $white-color;
                }
            }
        }
    }
}
</style>