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
    
    const getStatisticByPeriod = (period: string) => {
        const currentMonth = dayjs().month();
        const currentPeriod = {
            'month': dayjs().endOf('m'),
            'threeMonths': dayjs().month(currentMonth - 3),
            'sixMonths': dayjs().month(currentMonth - 6),
            'year': dayjs().year(),
            'all': 'all'
        }[period];

        const filteredStatistic = statistics.value.filter((stat) => {
            if(period === 'all') {
                return true;
            }

            if(period === 'year') {
                return stat.date.isAfter(currentPeriod, 'y');
            }

            if(period === 'month') {
                return stat.date.isSame(currentPeriod, 'M');
            }

            return stat.date.isAfter(currentPeriod, 'M');
        });

        return filteredStatistic;
    }
    
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
        getStatisticByPeriod
    }
})