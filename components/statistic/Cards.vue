<template>
    <div class="statistic-cards">
        <StatisticCard
            v-for="card in filteredStatistic"
            :id="card.id"
            :key="card.id"
            :title="card.title"
            :start-date="card.startDate"
            :type="card.type"
            :period="card.period"
            :stats="card.stats"
        />
    </div>
</template>

<script lang="ts" setup>
const statisticHabitsStore = useStatisticHabitsStore();

const { filteredStatistic } = storeToRefs(statisticHabitsStore);
</script>

<style lang="scss">
@use '/styles/mixins' as *;

.statistic-cards {
    margin-top: toRem(15);
}
</style>