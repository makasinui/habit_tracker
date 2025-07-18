<template>
    <div class="calendar">
        <div class="calendar__header">
            <Icon name="arrow-left" />
            <span> July </span>
            <Icon name="arrow-right" />
        </div>
        <div class="calendar__wrapper">
            <div class="calendar__weeks">
                <span
                    v-for="week in weeks"
                    :key="week"
                    class="calendar__week"
                >
                    {{ week }}
                </span>
            </div>
            <div class="calendar__days">
                <span
                    v-for="(day, idx) in calendarDays"
                    :key="idx"
                    class="calendar__day"
                    :class="{
                        'calendar__day--today': isToday(day),
                        'calendar__day--completed': isCompleted(day)
                    }"
                >
                    {{ day }}
                </span>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import localeData from 'dayjs/plugin/localeData';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

interface CalendarProps {
    completedDays?: Dayjs
}

dayjs.extend(localeData);

const weeks = computed(() => dayjs.weekdaysShort());

const calendarDays = computed(() => {
    const startOfMonth = dayjs().startOf('month');
    const daysInMonth = dayjs().daysInMonth();
    const firstDayOfWeek = startOfMonth.day();

    const days = [];

    for (let i = 0; i < firstDayOfWeek; i++) {
        days.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
        days.push(i);
    }

    return days;
});

const isToday = (day?: number) => {
    const today = Number(dayjs().format('D'));

    return today === day;
};

const isCompleted = (day?: number) => {

}
</script>

<style lang="scss">
@use '/styles/mixins' as *;

.calendar {
    &__wrapper {
        display: flex;
        flex-direction: column;
    }

    &__weeks {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
    }

    &__week,
    &__day {
        text-align: center;
    }
    
    &__days {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        justify-content: space-between;
        margin-top: toRem(15);
    }

    &__day {
        padding: toRem(10) 0;
        
        &--today {
            background: #2F2F2F;
            border-radius: toRem(10);
            color: white;
        }
        
        &--completed {
            background: #C7FFDE;
        }
    }
}
</style>
