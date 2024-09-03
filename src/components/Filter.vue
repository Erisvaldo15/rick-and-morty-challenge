<template>
    <div id="dropdown">
        <div id="filter">
            <button type="button" @click="showFilters = !showFilters">
                <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" fill="#fff" clip-rule="evenodd"
                        d="M0.75 6.75C0.75 6.33579 1.08579 6 1.5 6H22.5C22.9142 6 23.25 6.33579 23.25 6.75C23.25 7.16421 22.9142 7.5 22.5 7.5H1.5C1.08579 7.5 0.75 7.16421 0.75 6.75ZM4.5 12C4.5 11.5858 4.83579 11.25 5.25 11.25H18.75C19.1642 11.25 19.5 11.5858 19.5 12C19.5 12.4142 19.1642 12.75 18.75 12.75H5.25C4.83579 12.75 4.5 12.4142 4.5 12ZM9 17.25C9 16.8358 9.33579 16.5 9.75 16.5H14.25C14.6642 16.5 15 16.8358 15 17.25C15 17.6642 14.6642 18 14.25 18H9.75C9.33579 18 9 17.6642 9 17.25Z" />
                </svg>
                Filter
            </button>
        </div>
        <div id="filters" :class="{activate: showFilters}">
            <div class="filter-group status">
                <h2>Status:</h2>
                <div class="filter" v-for="(status, index) of filterOptions.status" :key="status">
                    <input type="checkbox" :value="status" v-model="filterStore.statusFromCheckbox['status'][index]" :id="status"
                        @change="verifyCheckboxs('status', index)" />
                    <label :for="status">{{ status }}</label>
                </div>
            </div>
            <div class="filter-group genders">
                <h2>Gender:</h2>
                <div class="filter" v-for="(gender, index) of filterOptions.gender" :key="gender">
                    <input type="checkbox" :value="gender" v-model="filterStore.statusFromCheckbox['gender'][index]" :id="gender"
                        @change="verifyCheckboxs('gender', index)" />
                    <label :for="gender">{{ gender }}</label>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

import { ref } from "vue";
import { useFilterStore } from "../stores/filterStore";
import { useApiStore } from "../stores/apiStore";

interface FilterOptions {
    [key: string]: string[],
}

const filterStore = useFilterStore();
const apiStore = useApiStore();

const showFilters = ref<boolean>(false);
const filterOptions = ref<FilterOptions>({
    status: ['alive', 'dead', 'unknown'],
    gender: ['male', 'female', 'genderless', 'unknown'],
});

async function verifyCheckboxs(filterType: string, index: number): Promise<void> {

    const checkboxGroup: boolean[] = filterStore.statusFromCheckbox[filterType];

    if (checkboxGroup[index]) { // verifica se index clicado é verdadeiro.
        checkboxGroup.find((_, checkboxIndex: number) => (checkboxIndex !== index) ? checkboxGroup[checkboxIndex] = false : '') 
        filterStore.removeFilter(filterType);
        filterStore.addFilter(filterType, filterOptions.value[filterType][index]);
    } 
    
    else {
        filterStore.removeFilter(filterType);
    }

    await apiStore.getAllCharactersPerPage()
}
</script>

<style lang="scss">

#filter {
    position: relative;
    gap: 1.6rem;
  
    button {
        display: flex;
        justify-content: center;
        background-color: $black-color;
        font-size: 1.8rem;
        color: $white-color;
        padding: 1.2rem 3.2rem;
        border-radius: 0.5rem;
        gap: 0.8rem;
        line-height: 2.4rem;
        text-shadow: 0 0.4rem 1.6rem #1616161a;
        transition: all 0.25s ease;
        cursor: pointer;

        &:hover {
            // background-color: $light-blue-color;
            color: $white-color;
            fill: $black-color;
        }
    }
}

#filters {
    display: none;
    gap: 2rem;
    position: absolute;
    background-color: $white-color;
    padding: 3rem;
    width: auto;
    height: 20rem;
    overflow-y: auto;

    &.activate {
        @include flex(start);
    }

    .filter-group {
        display: grid;
        gap: 2rem;
        width: 10.648rem;

        .filter {
            display: flex;
            gap: 1rem;
        }
    }
}
</style>