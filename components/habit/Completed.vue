<template>
    <div class="habit-completed">
        <img :src="Background" alt="">
        <div class="habit-completed__wrapper">
            3 of 5 today completed
        </div>
    </div>
</template>

<script lang="ts" setup>
import Background from '~/assets/img/bgHabits.svg'
</script>

<style lang="scss">
.habit-completed {
    position: relative;
    &__wrapper {
        position: absolute;
        top: 50%;
    }
}
</style>