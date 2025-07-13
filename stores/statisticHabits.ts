export const useStatisticHabitsStore = defineStore('statisticHabit', () => {
    const habitStore = useHabitStore();
    const statisticStore = useStatisticStore();

    const statisticWithHabits = computed(() => {
        return habitStore.habits.map((habit) => ({
            ...habit,
            stats: statisticStore.getAllStatisticById(habit.id),
        }));
    });

    return {
        statisticWithHabits
    }
});
