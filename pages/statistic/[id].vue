<template>
    <main class="container">
        <StatisticCardCalendar :card="currentCard" />
    </main>
</template>

<script lang="ts" setup>
const router = useRoute();
const statisticHabitStore = useStatisticHabitsStore();
const { statisticWithHabits } = storeToRefs(statisticHabitStore);

const currentCard = ref();

onMounted(() => {
    const id = router.params?.id;

    currentCard.value = statisticWithHabits.value.find((item) => item.id === +id);
})
</script>