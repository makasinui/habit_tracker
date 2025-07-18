<template>
    <div
        v-if="card"
        class="statistic-info"
    >
        <h3 class="statistic-info__title">Journaling</h3>

        <div class="statistic-info__wrapper">
            <UiInfo
                title="Habit name"
                :value="card.title"
            />
            <UiInfo
                title="Habit goal"
                :value="card.goal"
            />
            <UiInfo
                title="Habit type"
                :value="card.type"
            />
            <UiInfo
                title="Created at"
                :value="dayjs(card.startDate).format('MMMM DD YYYY')"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs';
import type { HabitWithStatistic } from '~/types';

interface InfoProps {
    card: HabitWithStatistic;
}

defineProps<InfoProps>();
</script>

<style lang="scss">
@use '/styles/mixins' as *;

.statistic-info {
    display: flex;
    flex-direction: column;
    background: #fff;
    border-radius: toRem(12);
    box-shadow: .5px .5px 1px .2px #8d8a8a;
    padding: toRem(27) toRem(22);
    margin-top: toRem(10);

    &__title {
        font-size: toRem(16);
        font-weight: bold;
    }

    &__wrapper {
        margin-top: toRem(35);
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
}
</style>
