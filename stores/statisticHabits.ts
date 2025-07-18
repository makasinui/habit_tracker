import dayjs from 'dayjs';
import type { Habit, HabitWithStatistic } from '~/types';

export const useStatisticHabitsStore = defineStore('statisticHabit', () => {
    const habitStore = useHabitStore();
    const statisticStore = useStatisticStore();
    const filteredStatistic = ref();

    const statisticWithHabits: Ref<HabitWithStatistic[]> = computed(() => {
        return habitStore.habits.map((habit: Habit) => ({
            ...habit,
            stats: statisticStore.getAllStatisticById(habit.id),
        }));
    });
    
    const getStatisticByPeriod = (period: string) => {
        const currentMonth = dayjs().month();
        const currentPeriod = {
            month: dayjs().endOf('m'),
            threeMonths: dayjs().month(currentMonth - 3),
            sixMonths: dayjs().month(currentMonth - 6),
            year: dayjs().year(),
            all: 'all',
        }[period];

        filteredStatistic.value = statisticWithHabits.value.filter(({stats}) => {
            const result = stats?.map((stat) => {
                if (period === 'all') {
                    return true;
                }
    
                if (period === 'year') {
                    return stat.date.isAfter(currentPeriod, 'y');
                }
    
                if (period === 'month') {
                    return stat.date.isSame(currentPeriod, 'M');
                }
    
                return stat.date.isAfter(currentPeriod, 'M');
            })

            return result
        });

    };

    return {
        statisticWithHabits,
        filteredStatistic,
        getStatisticByPeriod,
    };
});
