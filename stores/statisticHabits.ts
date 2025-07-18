import type { Habit, HabitWithStatistic } from "~/types";

export const useStatisticHabitsStore = defineStore('statisticHabit', () => {
    const habitStore = useHabitStore();
    const statisticStore = useStatisticStore();

    const statisticWithHabits: Ref<HabitWithStatistic[]> = computed(() => {
        return habitStore.habits.map((habit: Habit) => ({
            ...habit,
            stats: statisticStore.getAllStatisticById(habit.id),
        }));
    });

    return {
        statisticWithHabits
    }
});
