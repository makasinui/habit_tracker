<template>
    <div class="statistic-calendar">
        <UiCalendar :completed-days="completedDays" />
    </div>
</template>

<script lang="ts" setup>
import type { HabitWithStatistic } from '~/types';

interface CardCalendarProps {
    card: HabitWithStatistic;
}

const props = defineProps<CardCalendarProps>();

const completedDays = computed(() => {
    return props.card?.stats?.map(stat => stat.date);
});
</script>