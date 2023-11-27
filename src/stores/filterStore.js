import { defineStore } from 'pinia';
import { ref } from 'vue';
import { usePaginationStore } from './paginationStore';

export const useFilterStore = defineStore('filter', () => {

    const paginationStore = usePaginationStore();

    const statusFromCheckbox = ref({
        status: [false, false, false],
        gender: [false, false, false, false],
    });

    const queryString = ref('');
    const filters = ref([]);

    function removeFilter(typeOfFilter) {
        filters.value.forEach((filter, index) => {
            if (filter[typeOfFilter]) {
                filters.value.splice(index, 1);
            }
        });
    }

    function addFilter(typeOfFilter, valueForFilter) {
        filters.value.push({ [typeOfFilter]: valueForFilter });
        paginationStore.currentPage = 1;
    }

    function filter() {
        queryString.value = '';

        filters.value.forEach((filter) => {
            for (const key in filter) {
                if (Object.hasOwnProperty.call(filter, key)) {
                    if (queryString.value.includes(key)) {
                        return;
                    }

                    queryString.value += `&${key}=${filter[key].toLowerCase()}`;
                }
            }
        });
    }

    return { statusFromCheckbox, queryString, filters, addFilter, removeFilter, filter };
});
