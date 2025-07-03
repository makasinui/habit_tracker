import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import type { Statistic } from "~/types";

export const useStatisticStore = defineStore('statistic', () => {
    const statistics = ref<Statistic[]>([]);

    const getTodayIsCompleted = (habitId: number) => {
        const today = dayjs().startOf('day');
        return statistics.value.some(stat => stat.habitId === habitId && stat.date.isSame(today, 'day'));
    }

    const addToStatistic = (habitId: number, date: Dayjs) => {
        const existingStat = statistics.value.find(stat => stat.habitId === habitId && stat.date.isSame(date, 'day'));
        if (!existingStat) {
            const newStat: Statistic = {
                id: statistics.value.length + 1,
                habitId,
                date
            };

            statistics.value.push(newStat);
        }
    }

    const removeFromStatistic = (habitId: number, date: Dayjs) => {
        statistics.value = statistics.value.filter(stat => !(stat.habitId === habitId && stat.date.isSame(date, 'day')));
    }

    const getAllStatisticById = (habitId: number) => {
        return statistics.value.filter(stat => stat.habitId === habitId);
    }

    return {
        statistics,
        getTodayIsCompleted,
        addToStatistic,
        removeFromStatistic,
        getAllStatisticById
    }
})