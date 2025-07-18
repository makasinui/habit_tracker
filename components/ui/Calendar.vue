<template>
    <div class="calendar">
        <div class="calendar__header">
            <Icon
                class="pointer"
                name="material-symbols:arrow-back-ios"
                size="15"
                @click="changeMonth('prev')"
            />
            <span class="calendar__header-month"> {{ currentMonth }} </span>
            <Icon
                class="pointer"
                name="material-symbols:arrow-forward-ios"
                size="15"
                @click="changeMonth('next')"
            />
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
                        'calendar__day--completed': isCompleted(day),
                    }"
                >
                    {{ day ? day.date() : '' }}
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
    completedDays?: Dayjs[];
}

dayjs.extend(localeData);

const props = defineProps<CalendarProps>();

const weeks = computed(() => dayjs.weekdaysShort());

const activeDate = ref<Dayjs>(dayjs());

const currentMonth = computed(() => activeDate.value.format('MMMM'));

const changeMonth = (direction: 'next' | 'prev') => {
    if (direction === 'next') {
        activeDate.value = activeDate.value.add(1, 'month');
    } else {
        activeDate.value = activeDate.value.subtract(1, 'month');
    }
};

const calendarDays = computed(() => {
    const startOfMonth = activeDate.value.startOf('month');
    const daysInMonth = activeDate.value.daysInMonth();
    const firstDayOfWeek = startOfMonth.day();

    const days = [];

    for (let i = 0; i < firstDayOfWeek; i++) {
        days.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
        days.push(startOfMonth.date(i));
    }

    return days;
});

const isToday = (day?: Dayjs | null) => {
    return day ? day.isSame(dayjs(), 'day') : false;
};

const isCompleted = (day?: Dayjs | null) => {
    if(!day || !props.completedDays?.length) return
    return props.completedDays.some(completedDay => completedDay.isSame(day, 'day'));
};
</script>

<style lang="scss">
@use '/styles/mixins' as *;

.calendar {
    max-width: toRem(350);
    margin: 0 auto;

    &__header {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: toRem(20);

        &-month {
            display: inline-block;
            width: toRem(100);
            font-size: toRem(18);
            font-weight: 600;
            text-align: center;
            color: #FF3D00;
        }
    }

    &__wrapper {
        display: flex;
        margin-top: toRem(15);
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
            background: #2f2f2f;
            border-radius: toRem(10);
            color: white;
        }

        &--completed {
            background: #c7ffde;
            color: black;
            border-radius: unset;
        }
    }
}
</style>
