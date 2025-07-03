import type { Habit } from "~/types/habit";

export const useHabitStore = defineStore('habit', () => {
    const habits = ref<Habit[]>([{id: 1, title: 'asd', type: 'daily', goal: 'asd', startDate: Date.now()}]);

    return {
        habits
    }
});