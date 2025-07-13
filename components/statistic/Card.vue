<template>
    <div class="statistic-card">
        <div class="statistic-card__progress">
            <canvas ref="canvas" />
        </div>
        <div class="statistic-card__info">
            <span>{{ title }}</span>
            <span>{{ daysCompleted }}</span>
        </div>
        <div class="statistic-card__status">
            <UiBadge :color="badgeColor">
                {{ progress === '100' ? 'Completed' : 'Uncompleted' }}
            </UiBadge>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { type HabitType, HabitPeriod, type Statistic } from '~/types';
import { useCard } from './composables/card';

dayjs.extend(isBetween);

interface StatisticCardProps {
    title: string;
    startDate: Dayjs;
    type: HabitType;
    period: HabitPeriod;
    stats: Statistic[];
    id: number;
}

const props = defineProps<StatisticCardProps>();
const { type, period, stats } = props;

const completedDays = computed(() => getCompleted(type, period, stats))

const {
    getCompleted
} = useCard();

const allDays = {
    [HabitPeriod.INFINITE]: '∞',
    [HabitPeriod.MONTH]: dayjs().daysInMonth(),
    [HabitPeriod.WEEK]: weeksInMonth(dayjs()),
}[period];

const daysCompleted = computed(() => {
    return `completed ${completedDays.value} from ${allDays}`;
});

const progress = computed(() => {
    if(allDays !== '∞') {
        return (completedDays.value / (allDays as number) * 100).toFixed()
    }

    return ''
})

const badgeColor = computed(
    () => progress.value === '100' ? 'green' : 'gray'
)
</script>
