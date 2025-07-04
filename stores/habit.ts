import type { Habit, HabitForm } from '~/types';

export const useHabitStore = defineStore('habit', () => {
    const habits = ref<Habit[]>([
        { id: 1, title: 'asd', type: 'daily', goal: 'asd', startDate: Date.now() },
        { id: 2, title: 'asd', type: 'daily', goal: 'asd', startDate: Date.now() },
    ]);

    const isOpenCreateModal = ref(false);

    const onChangeCreateModal = (value: boolean) => {
        isOpenCreateModal.value = value;
    };

    const addHabit = (form: HabitForm) => {
        const period = form.period.id;
        const type = form.type.id;

        habits.value.push({
            ...form,
            period,
            type,
            id: Date.now()
        });
    }

    return {
        habits,
        isOpenCreateModal,
        onChangeCreateModal,
        addHabit
    };
});
