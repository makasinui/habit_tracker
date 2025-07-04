<template>
    <div class="form-field">
        <span class="form-field__label">{{ label }}</span>
        <UiInput v-model="modelValue" @update:model-value="onChange" />
        <UiError :error="error" />
    </div>
</template>

<script lang="ts" setup>
import type { ErrorObject } from '@vuelidate/core';


interface FormFieldProps {
    label: string;
    error?: ErrorObject[];
}

defineProps<FormFieldProps>();
const modelValue = defineModel<string>();

const onChange = (e: string) => {
    modelValue.value = e;
}
</script>

<style lang="scss">
@use '/styles/mixins' as *;

.form-field {
    display: flex;
    flex-direction: column;
    gap: toRem(8);

    &__label {
        font-size: toRem(14);
    }
}
</style>