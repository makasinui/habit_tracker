import type { Habit, HabitForm } from '~/types';

export const useHabitStore = defineStore('habit', () => {
    const habits = ref<Habit[]>([]);

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
    
    const updateHabit = (form: Required<HabitForm>) => {
        const period = form.period.id;
        const type = form.type.id;

        const habit = {
            ...form,
            period,
            type
        };

        const habitIdx = habits.value.findIndex((hab) => hab.id === habit.id);

        if(habitIdx !== -1) {
            habits.value.splice(habitIdx, 1, habit)
        }
    }

    const deleteHabit = (habitId: number) => {
        const habitIdx = habits.value.findIndex((hab) => hab.id === habitId);
        if(habitIdx !== -1) {
            habits.value.splice(habitIdx, 1);
        }
    }

    return {
        habits,
        addHabit,
        updateHabit,
        deleteHabit
    };
});
