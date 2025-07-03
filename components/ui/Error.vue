<template>
    <span v-if="error" class="error">
        {{ error }}
    </span>
</template>

<script lang="ts" setup>
interface ErrorProps {
    error?: string;
}

defineProps<ErrorProps>();
</script>

<style lang="scss">
@use '/styles/mixins' as *;

.error {
    color: rgba(143, 17, 17, 0.658);
    font-size: toRem(12);
}
</style>