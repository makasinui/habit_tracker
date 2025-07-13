<template>
    <div class="statistic-filter">
        <h3>Progress Report</h3>
        <UiDropdown
            v-model="period"
            title="Period"
            :options="allPeriods"
            @update:model-value="onChangePeriod"
        />
    </div>
</template>

<script lang="ts" setup>
import type { DropdownOption } from '~/types';

const statisticStore = useStatisticStore();

const allPeriods: DropdownOption<string>[] = [
    {
        id: 'month',
        label: 'This Month'
    },
    {
        id: 'threeMonths',
        label: 'Last 3 Months'
    },
    {
        id: 'sixMonths',
        label: 'Last 6 Months'
    },
    {
        id: 'year',
        label: 'This Year'
    },
    {
        id: 'all',
        label: 'All time'
    }
];

const period = ref<DropdownOption>(allPeriods[0]);

const onChangePeriod = (period: DropdownOption<string>) => {
    if(period?.id) {
        statisticStore.getStatisticByPeriod(period.id);
    }
}
</script>

<style lang="scss">
.statistic-filter {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .dropdown {
        flex-basis: 45%;
    }
}
</style>