<template>
    <span v-if="error?.[0]?.$message" class="error">
        {{ error[0].$message }}
    </span>
</template>

<script lang="ts" setup>
import type { ErrorObject } from '@vuelidate/core';

interface ErrorProps {
    error?: ErrorObject[];
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