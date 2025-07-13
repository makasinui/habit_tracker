<template>
    <RouterLink :to="`/statistic/${id}`" class="statistic-card">
        <div class="statistic-card__progress">
            <canvas ref="canvas" width="60" height="60" />
        </div>
        <div class="statistic-card__info">
            <span class="statistic-info__title">{{ title }}</span>
            <span>{{ daysCompleted }}</span>
        </div>
        <div class="statistic-card__status">
            <UiBadge :color="badgeColor">
                {{ progress === '100' ? 'Completed' : 'Uncompleted' }}
            </UiBadge>
        </div>
    </RouterLink>
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

const { canvas, drawCircleProgress } = useCanvas();

const completedDays = computed(() => getCompleted(type, period, stats));

const { getCompleted } = useCard();

const allDays = {
    [HabitPeriod.INFINITE]: '∞',
    [HabitPeriod.MONTH]: dayjs().daysInMonth(),
    [HabitPeriod.WEEK]: weeksInMonth(dayjs()),
}[period];

const daysCompleted = computed(() => {
    return `completed ${completedDays.value} from ${allDays}`;
});

const progress = computed(() => {
    if (allDays !== '∞') {
        return ((completedDays.value / (allDays as number)) * 100).toFixed();
    }

    return '100';
});

const badgeColor = computed(() => (progress.value === '100' ? 'green' : 'gray'));

onMounted(() => {
    drawCircleProgress(+progress.value / 100, 20, '#5FE394', '#DBDBDB')
});
</script>

<style lang="scss">
@use '/styles/mixins' as *;

.statistic-card {
    background: #fbfbfb;
    border-radius: 10px;
    display: flex;
    height: 100%;
    align-items: center;
    gap: toRem(20);
    padding: toRem(12);
    transition: 0.3s all;
    cursor: pointer;

    &__info {
        display: flex;
        flex-direction: column;

        .statistic-info__title {
            font-weight: 600;
        }
    }
    
    &__status {
        margin-left: auto;
    }

    &:hover {
        background: #f6ecec;
    }
}
</style>
