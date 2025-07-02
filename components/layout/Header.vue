<template>
    <header class="header container">
        <div class="header__info">
            <span>{{ headerInfo }}</span>
            <span>Hello!</span>
        </div>
    </header>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs';

const today = dayjs();

const headerInfo = computed(
    () => `${today.format('dddd')}, ${today.date()} ${today.format('MMMM')} ${today.year()}`
);

</script>
<style lang="scss">
.header {
    &__info {
        display: flex;
        flex-direction: column;
        gap: 6px;
        font-size: 20px;
    }
}
</style>