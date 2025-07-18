<template>
    <div class="statistic-calendar">
        <UiCalendar :completed-days="completedDays" />
    </div>
</template>

<script lang="ts" setup>
import type { HabitWithStatistic } from '~/types';
import { useCard } from './composables/card';

interface CardCalendarProps {
    card: HabitWithStatistic;
}

const props = defineProps<CardCalendarProps>();

const { getCompletedCalendarDays } = useCard();

const completedDays = computed(() => getCompletedCalendarDays(props.card));
</script>