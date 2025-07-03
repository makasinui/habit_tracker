<template>
    <section class="habit__cards">
        <h2 class="habit__cards-title">Today Habit</h2>
        <div class="habit__cards-wrapper">
            <HabitCard
                v-for="habit in habits"
                :id="habit.id"
                :key="habit.id"
                :title="habit.title"
            />
        </div>
    </section>
</template>

<script lang="ts" setup>
const habitStore = useHabitStore();

const { habits } = storeToRefs(habitStore);
</script>

<style lang="scss">
@use '/styles/mixins' as *;

.habit__cards {    
    padding: toRem(30) toRem(15);
    background: #fff;
    box-shadow: .5px .5px 1px .2px #8d8a8a;
    border-radius: toRem(15);
    
    &-title {
        font-size: toRem(21);
        font-weight: 600;
    }

    &-wrapper {
        margin-top: toRem(20);
        display: flex;;
        flex-direction: column;
        gap: toRem(15);
    }
}
</style>