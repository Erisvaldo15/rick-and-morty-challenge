import { defineStore } from 'pinia';
import { ref } from 'vue';
import { usePaginationStore } from './paginationStore';

export const useFilterStore = defineStore('filter', () => {

    interface CheckboxStatus {
        [key: string]: boolean[], // ensure that i can pass the key without any type issue.
        status: boolean[],
        gender: boolean[],
    }

    interface Filter {
        [key: string]: string;
    }

    const paginationStore = usePaginationStore();

    const queryString = ref<string>("");
    const filters = ref<Filter[]>([]);
    const statusFromCheckbox = ref<CheckboxStatus>({
        'status': [false, false, false],
        'gender': [false, false, false, false],
    });

    function removeFilter(filterType: string): void { 
        const foundFilterIndex: number = filters.value.findIndex((filter) => filter[filterType]);
        filters.value.splice(foundFilterIndex, 1); 
    }

    function addFilter(filterType: string, filterValue: string): void {
        filters.value.push({ [filterType]: filterValue });
        paginationStore.currentPage = 1;
    }

    function filter(): void {
        queryString.value = "";
        filters.value.forEach((filter) => {
            Object.keys(filter).forEach((key) => {
                if (!queryString.value.includes(key)) {
                    queryString.value += `&${key.toLowerCase()}=${filter[key]}`;
                }
            });
        });
    }

    return { statusFromCheckbox, queryString, filters, addFilter, removeFilter, filter };
});
