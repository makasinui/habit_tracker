<template>
    <div class="form-field">
        <span class="form-field__label">{{ label }}</span>
        <UiInput v-model="modelValue" />
    </div>
</template>

<script lang="ts" setup>
interface FormFieldProps {
    label: string;
}

defineProps<FormFieldProps>();
const modelValue = defineModel<string>('');
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