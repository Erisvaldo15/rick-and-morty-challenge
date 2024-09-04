import { defineStore } from "pinia";
import { ref } from "vue";
import { useApiStore } from "./apiStore";
export const usePaginationStore = defineStore("pagination", () => {

    const apiStore = useApiStore();
    const currentPage = ref<number>(1);
    const maxPages = ref<number>(1);

    async function next(): Promise<void> {
        currentPage.value++;
        await apiStore.getAllCharactersPerPage();
    }
    
    async function lastPage(): Promise<void> {
        currentPage.value = maxPages.value;
        await apiStore.getAllCharactersPerPage();
    }

    async function page(page: number): Promise<void> {
        if (maxPages.value === 1) return;
        currentPage.value = page;
        await apiStore.getAllCharactersPerPage();
    }

    async function prev(): Promise<void> {
        currentPage.value--;
        await apiStore.getAllCharactersPerPage();
    }

    async function firstPage(): Promise<void> {
        currentPage.value = 1;
        await apiStore.getAllCharactersPerPage();
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