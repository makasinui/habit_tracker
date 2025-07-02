import type { Habit } from "~/types/habit";

export const useHabitStore = defineStore('habit', () => {
    const habits = ref<Habit[]>([]);
    
});