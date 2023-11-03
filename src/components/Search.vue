<template>
    <div id="field">
        <img src="search-icon.svg" alt="Icon search" />
        <input
            type="text"
            name="name"
            id="name"
            placeholder="Search by name"
            @input="debouncedVerifyIfFieldIsEmpty"
        />
    </div>
</template>

<script setup>
import { useApiStore } from "../stores/apiStore";
import { useFilterStore } from "../stores/filterStore";

const filterStore = useFilterStore();

function verifyIfFieldIsEmpty(event) {
    const typedValue = event.target.value;

    if (typedValue.length > 0) {
        filterStore.removeFilter("name"); // remove old filter for add other.
        filterStore.addFilter("name", typedValue);
    } else {
        filterStore.removeFilter("name");
    }

    useApiStore().getAllCharactersPerPage();
}

const debouncedVerifyIfFieldIsEmpty = debounce(verifyIfFieldIsEmpty, 500);

function debounce(func, wait) {
    let timeout;
    return function (...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

</script>

<style lang="scss">

#field {
    @include flex(start, center, row);
    width: 100%;
    background-color: $white-color;
    border: 0.07rem solid #303030;
    border-radius: 0.8rem;
    height: 5rem;
    box-shadow: 0 0.4rem 1.6rem 0 rgba(22, 22, 22, 0.1);

    img {
        margin-left: 1rem;
    }

    input {
        width: 100%;
        height: 100%;
        font-size: 1.6rem;
        line-height: 1.6rem;
        margin: 0.8rem;
        outline: none;
        border: none;
    }
}
</style>
