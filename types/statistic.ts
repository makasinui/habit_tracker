import type { Dayjs } from "dayjs";

export interface Statistic {
    id: number;
    habitId: number;
    date: Dayjs;
}