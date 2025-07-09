import { HabitModalType, type Habit, type HabitForm } from '~/types';

export const useHabitStore = defineStore('habit', () => {
    const habits = ref<Habit[]>([]);

    const isOpenModal = ref(false);
    const modalType = ref<HabitModalType>(HabitModalType.CREATE);
    
    const onChangeCreateModal = (value: boolean, type?: HabitModalType) => {
        isOpenModal.value = value;
        modalType.value = type ?? HabitModalType.CREATE;
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

    const deleteHabit = (habitId: number) => {
        const habitIdx = habits.value.findIndex((hab) => hab.id === habitId);
        if(habitIdx) {
            habits.value.splice(habitIdx, 1);
        }
    }

    return {
        habits,
        isOpenModal,
        modalType,
        onChangeCreateModal,
        addHabit,
        deleteHabit
    };
});
