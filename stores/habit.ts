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
            id: Date.now(),
        });

        saveInStorage();
    };

    const updateHabit = (form: Required<HabitForm>) => {
        const period = form.period.id;
        const type = form.type.id;

        const habit = {
            ...form,
            period,
            type,
        };

        const habitIdx = habits.value.findIndex((hab) => hab.id === habit.id);

        if (habitIdx !== -1) {
            habits.value.splice(habitIdx, 1, habit);
            saveInStorage();
        }
    };

    const deleteHabit = (habitId: number) => {
        const habitIdx = habits.value.findIndex((hab) => hab.id === habitId);
        
        if (habitIdx !== -1) {
            habits.value.splice(habitIdx, 1);
            saveInStorage();
        }
    };

    const saveInStorage = () => {
        localStorage.setItem('habits', JSON.stringify(habits.value));
    }

    onMounted(() => {
        const localHabits = localStorage.getItem('habits');
        console.log(localHabits)
        if(localHabits) {
            habits.value = JSON.parse(localHabits);
        }
    })

    return {
        habits,
        addHabit,
        updateHabit,
        deleteHabit,
    };
});
