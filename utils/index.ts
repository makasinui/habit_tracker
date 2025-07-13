import type { Dayjs } from "dayjs";

export const firstCharToUppercase = (word: string) => {
    return word[0].toUpperCase() + word.slice(1);
}

export const weeksInMonth = (date: Dayjs): number => {
  const firstDay = date.startOf('month').day() || 7;
  const daysInMonth = date.daysInMonth();
  return Math.ceil((daysInMonth + firstDay - 1) / 7);
};