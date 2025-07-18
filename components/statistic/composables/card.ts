import dayjs from 'dayjs';
import { HabitPeriod, HabitType, type HabitWithStatistic, type Statistic } from '~/types';

export const useCard = () => {
    const getCompleted = (type: HabitType, period: HabitPeriod, stats?: Statistic[]) => {
        let completedDays = 0;
        if(!stats) {
            return 0
        }

        if (type === HabitType.DAILY) {
            completedDays = stats.filter((stat) => {
                if (period === HabitPeriod.WEEK) {
                    return stat.date.isAfter(dayjs().startOf('week'));
                }

                if (period === HabitPeriod.MONTH) {
                    return stat.date.isAfter(dayjs().startOf('M'));
                }

                return true;
            }).length;
        }

        if (type === HabitType.WEEKLY) {
            completedDays = stats.filter((stat) => {
                if (period === HabitPeriod.WEEK) {
                    return stat.date.isSame(dayjs(), 'week');
                }

                if (period === HabitPeriod.MONTH) {
                    const startOfMonth = dayjs().startOf('month');
                    const endOfMonth = dayjs().endOf('month');
                    let currentWeekStart = startOfMonth.startOf('week');
                    let weeksCompleted = 0;

                    while (currentWeekStart.isBefore(endOfMonth)) {
                        const currentWeekEnd = currentWeekStart.endOf('week');

                        const hasCompletion = stats.some((stat) => stat.date.isBetween(currentWeekStart, currentWeekEnd, null, '[]'));

                        if (hasCompletion) weeksCompleted++;
                        currentWeekStart = currentWeekStart.add(1, 'week');
                    }

                    return weeksCompleted;
                }

                const allCompletedWeeks = new Set(stats.map((stat) => stat.date.startOf('week').format('YYYY-MM-DD')));

                return allCompletedWeeks.size;
            }).length;
        }

        if (type === HabitType.MONTHLY) {
            completedDays = stats.filter((stat) => {
                if (period === HabitPeriod.MONTH || period === HabitPeriod.WEEK) {
                    return stat.date.isSame(dayjs(), 'M');
                }

                const allCompletedMonths = new Set(stats.map((stat) => stat.date.startOf('M').format('YYYY-MM-DD')));

                return allCompletedMonths.size;
            }).length;
        }

        if (type === HabitType.YEARLY) {
            completedDays = stats.filter((stat) => {
                if (period === HabitPeriod.MONTH || HabitPeriod.WEEK) {
                    return stat.date.isSame(dayjs(), 'year');
                }

                const allCompletedYears = new Set(stats.map((stat) => stat.date.year()));

                return allCompletedYears.size;
            }).length;
        }

        return completedDays;
    };

    const getCompletedCalendarDays = (card: HabitWithStatistic) => {
        if (!card || !card.stats) return [];

        const habitType = card.type;
        const rawDates = card.stats.map((stat) => stat.date);

        const result = [];

        for (const dateStr of rawDates) {
            const date = dayjs(dateStr);

            switch (habitType) {
                case HabitType.DAILY:
                    result.push(date);
                    break;

                case HabitType.WEEKLY: {
                    const startOfWeek = date.startOf('week');
                    for (let i = 0; i < 7; i++) {
                        result.push(startOfWeek.add(i, 'day'));
                    }
                    break;
                }

                case HabitType.MONTHLY: {
                    const startOfMonth = date.startOf('month');
                    const daysInMonth = date.daysInMonth();
                    for (let i = 0; i < daysInMonth; i++) {
                        result.push(startOfMonth.add(i, 'day'));
                    }
                    break;
                }

                case HabitType.YEARLY: {
                    const startOfYear = date.startOf('year');
                    const endOfYear = date.endOf('year');
                    for (let d = startOfYear; d.isBefore(endOfYear) || d.isSame(endOfYear, 'day'); d = d.add(1, 'day')) {
                        result.push(d);
                    }
                    break;
                }

                default:
                    break;
            }
        }

        return result;
    };

    return {
        getCompleted,
        getCompletedCalendarDays
    };
};
