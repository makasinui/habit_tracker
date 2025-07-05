<template>
    <div class="habit-completed">
        <img
            class="habit-completed__img"
            :src="Background"
            alt="bg"
        >
        <div class="habit-completed__wrapper">
            <canvas
                v-show="habits.length"
                ref="canvas"
                width="150"
                height="150"
            />
            <div>
                {{ todayIsCompleted }}
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import Background from '~/assets/img/bgHabits.svg';

const statisticStore = useStatisticStore();
const habitStore = useHabitStore();

const { habits } = storeToRefs(habitStore);
const { todayCompleted } = storeToRefs(statisticStore);

const progress = computed(() => todayCompleted.value.length / habits.value.length);

const { canvas, drawCircleProgress } = useCanvas();

const todayIsCompleted = computed(() =>
    habits.value.length 
    ? `${todayCompleted.value.length} of ${habits.value.length} today completed` 
    : 'Add new habits for view the progress!',
);

onMounted(() => drawCircleProgress(progress.value));
watch(
    () => [todayCompleted.value, habits.value.length],
    () => drawCircleProgress(progress.value),
);
</script>

<style lang="scss">
@use '/styles/mixins' as *;

.habit-completed {
    position: relative;
    &__img {
        width: 100%;
        max-height: 200px;
        object-fit: cover;
        border-radius: 10px;
    }

    &__circle {
        width: toRem(50);
        height: toRem(50);
        border-radius: 100%;
        border: 3px solid white;
        &::after {
            content: '';
            width: 30px;
            height: 30px;
            border: 3px solid black;
            border-radius: 100%;
        }
    }

    &__wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        color: #fff;
        width: 100%;
        padding: 0 toRem(20);
    }
}
</style>
