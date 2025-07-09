import type { Dayjs } from "dayjs";
import type { DropdownOption } from "../global";

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
}

export enum HabitModalType {
    CREATE = 'create',
    EDIT = 'edit'
}