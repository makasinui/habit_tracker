import type { Dayjs } from "dayjs";
import type { DropdownOption } from "../global";
import type { Statistic } from "../statistic";

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
    startDate: Dayjs;
    endDate?: string;
}

//export type HabitForm = Omit<Habit, 'id'>;

export interface HabitForm extends Omit<Habit, 'id' | 'period' | 'type'> {
    period: DropdownOption<HabitPeriod>;
    type: DropdownOption<HabitType>;
    id?: number;
}

export enum HabitModalType {
    CREATE = 'create',
    EDIT = 'edit',
    DELETE = 'delete'
}
export interface HabitWithStatistic extends Habit {
    stats?: Statistic[]
}