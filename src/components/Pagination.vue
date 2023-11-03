<template>
    <div id="pagination" v-if="apiStore.data.results">
        <template v-if="paginationStore.currentPage > 1">
            <div class="control" id="next" @click="paginationStore.firstPage()"> &lt;&lt; </div>
            <div class="control" id="next" @click="paginationStore.prev()"> &lt; </div>
        </template>
        <button type="button" class="control" :class="{ 'current-page': number === paginationStore.currentPage }"
            v-for="number of paginationStore.formatterPagination()" :key="number" @click="paginationStore.page(number)">
            {{ number }}
        </button>
        <template v-if="paginationStore.maxPages > paginationStore.currentPage">
            <div class="control" id="next" @click="paginationStore.next()"> > </div>
            <div class="control" id="next" @click="paginationStore.lastPage()"> >> </div>
        </template>
    </div>
</template>

<script setup>

    import { usePaginationStore } from '../stores/paginationStore';
    import { useApiStore } from '../stores/apiStore';

    const apiStore = useApiStore()
    const paginationStore = usePaginationStore()

</script>

<style lang="scss">
#pagination {
    @include flex(center, center, row);
    gap: 2rem;
    padding: 1rem 2rem;
    border-radius: 0.5rem;

    .control {
        @include flex(center, center, row);
        width: 4rem;
        height: 4rem;
        background-color: $blue-color;
        color: $white-color;
        clip-path: circle();
        cursor: pointer;

        &:hover {
            background-color: $light-blue-color;
        }
    }

    .current-page {
        background-color: $light-blue-color;
    }

    button {
        padding: 1rem;
    }
}
</style>