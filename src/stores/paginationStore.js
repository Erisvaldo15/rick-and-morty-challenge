import { defineStore } from "pinia";
import { ref } from "vue";
import { useApiStore } from "./apiStore";

export const usePaginationStore = defineStore("pagination", () => {
    const apiStore = useApiStore();
    const currentPage = ref(1);
    const maxPages = ref(1);

    function next() {
        currentPage.value++;
        apiStore.getAllCharactersPerPage();
    }

    function lastPage() {
        currentPage.value = maxPages.value;
        apiStore.getAllCharactersPerPage();
    }

    function page(page) {

        if(maxPages.value === 1) {
            return
        }

        currentPage.value = page;
        apiStore.getAllCharactersPerPage();
    }

    function prev() {
        currentPage.value--;
        apiStore.getAllCharactersPerPage();
    }

    function firstPage() {
        currentPage.value = 1;
        apiStore.getAllCharactersPerPage();
    }

    function formatterPagination() {

        let adjacentsPages = [];
        const numAdjacentPages = 1;

        const startPage = Math.max(1, currentPage.value - numAdjacentPages);
        const endPage = Math.min(maxPages.value, startPage + numAdjacentPages * 2);

        for (let i = startPage; i <= endPage; i++) {
            adjacentsPages.push(i);
        }

        return adjacentsPages;
    }

    return {
        currentPage,
        maxPages,
        page,
        next,
        lastPage,
        prev,
        firstPage,
        formatterPagination,
    };
});
