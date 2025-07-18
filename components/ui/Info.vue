<template>
    <div class="info">
        <div class="info__title">
            {{ title }}
        </div>
        <div class="info__value">
            {{ value }}
        </div>
    </div>
</template>

<script lang="ts" setup>
interface InfoProps {
    title: string
    value: string | number | null
}

defineProps<InfoProps>();
</script>

<style lang="scss">
@use '/styles/mixins' as *;

.info {
    display: flex;
    justify-content: space-between;

    &__title, &__value {
        font-size: toRem(14);
    }
}
</style>