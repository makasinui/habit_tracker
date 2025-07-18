import type { Dayjs, OpUnitType } from "dayjs";
import dayjs from "dayjs";
import { HabitType, type Statistic } from "~/types";

export const useStatisticStore = defineStore('statistic', () => {
    const statistics = ref<Statistic[]>([]);

    const getTodayIsCompleted = (habitId: number, habitType: HabitType) => {
        const today = dayjs().startOf('day');
        
        const getByMeasure = (measure: OpUnitType) => {
            return statistics.value.some(stat => stat.habitId === habitId && stat.date.isSame(today, measure))
        }

        switch(habitType) {
            case HabitType.DAILY:
                return getByMeasure('day')
            case HabitType.WEEKLY:
                return getByMeasure('week')
            case HabitType.MONTHLY:
                return getByMeasure('month')
            case HabitType.YEARLY:
                return getByMeasure('year')
        }
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
            saveInStorage();
        }
    }

    const removeFromStatistic = (habitId: number, date: Dayjs) => {
        statistics.value = statistics.value.filter(stat => !(stat.habitId === habitId && stat.date.isSame(date, 'day')));
        saveInStorage();
    }

    const getAllStatisticById = (habitId: number) => {
        return statistics.value.filter(stat => stat.habitId === habitId);
    }

    const todayCompleted = computed(() => {
        return statistics.value.filter(stat => stat.date.isSame(dayjs(), 'day'));
    });
    
   
    
    const saveInStorage = () => {
        localStorage.setItem('statistics', JSON.stringify(statistics.value));
    }

    onMounted(() => {
        const localStatistics = localStorage.getItem('statistics');
        if(localStatistics) {
            const parsed = JSON.parse(localStatistics);
            let data = parsed;
            if(parsed?.length) {
                data = parsed.map((item: Statistic) => ({...item, date: dayjs(item.date)}))
            }

            statistics.value = data;
        }
    })
    
    return {
        statistics,
        todayCompleted,
        getTodayIsCompleted,
        addToStatistic,
        removeFromStatistic,
        getAllStatisticById,
    }
})