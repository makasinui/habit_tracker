export enum HabitType {
    DAILY = 'daily',
    WEEKLY = 'weekly',
    MONTHLY = 'monthly',
    YEARLY = 'yearly'
}

export enum HabitPeriod {
    MONTH = 'month',
    WEEK = 'week',
    INFINITE = 'infinite'
}

export interface Habit {
    id: number;
    title: string;
    period: HabitPeriod;
    type: HabitType;
    goal: string;
    startDate: string;
    endDate?: string;
}