<template>
    <div class="dropdown__field">
        <span class="label">{{ label }}</span>
        <UiDropdown
            :title="title"
            :model-value="modelValue"
            :options="options"
        />
        <UiError :error="error" />
    </div>
</template>

<script lang="ts" setup>
import type { ErrorObject } from '@vuelidate/core';
import type { DropdownOption } from '~/types';

interface DropdownFieldProps {
    options: DropdownOption[];
    label: string;
    title: string;
    error?: ErrorObject[]
}

defineProps<DropdownFieldProps>();

const modelValue = defineModel<DropdownOption>();
</script>

<style lang="scss" scoped>
.dropdown__field {
    display: flex;
    justify-content: space-between;

    .dropdown,
    .label {
        width: 50%;
    }
}
</style>
