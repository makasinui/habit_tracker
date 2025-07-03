import type { Habit } from '~/types/habit';

export const useHabitStore = defineStore('habit', () => {
    const habits = ref<Habit[]>([
        { id: 1, title: 'asd', type: 'daily', goal: 'asd', startDate: Date.now() },
        { id: 2, title: 'asd', type: 'daily', goal: 'asd', startDate: Date.now() },
    ]);

    const isOpenCreateModal = ref(false);

    const onChangeCreateModal = (value: boolean) => {
        isOpenCreateModal.value = value;
    };

    return {
        habits,
        isOpenCreateModal,
        onChangeCreateModal,
    };
});
