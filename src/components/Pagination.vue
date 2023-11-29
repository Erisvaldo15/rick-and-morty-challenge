<template>
    <div id="pagination" v-if="apiStore.data.results">
        <template v-if="paginationStore.currentPage > 1">
            <a href="#" class="control" id="next" @click="paginationStore.firstPage()">
                &lt;&lt;
            </a>
            <a href="#" class="control" id="next" @click="paginationStore.prev()">
                &lt;
            </a>
        </template>
        <a
            href="#"
            class="control"
            :class="{ 'current-page': number === paginationStore.currentPage }"
            v-for="number of paginationStore.formatterPagination()"
            :key="number"
            @click="paginationStore.page(number)">
            {{ number }}
        </a>
        <template v-if="paginationStore.maxPages > paginationStore.currentPage">
            <a href="#" class="control" id="next" @click="paginationStore.next()">
                >
            </a>
            <a href="#" class="control" id="next" @click="paginationStore.lastPage()">
                >>
            </a>
        </template>
    </div>
</template>

<script setup>
import { usePaginationStore } from '../stores/paginationStore';
import { useApiStore } from '../stores/apiStore';

const apiStore = useApiStore();
const paginationStore = usePaginationStore();
</script>

<style lang="scss">
#pagination {
    z-index: 2;
    bottom: 2rem;
    @include flex(center, center, row);
    flex-wrap: wrap;
    gap: 2rem;
    padding: 1rem 2rem;
    border-radius: 0.5rem;

    .control {
        @include flex(center, center, row);
        width: 4rem;
        height: 4rem;
        background-color: $black-color;
        color: $white-color;
        clip-path: circle();
        cursor: pointer;

        &:hover {
            background-color: $light-black;
        }
    }

    .current-page {
        background-color: $light-black;
    }

}
</style>
