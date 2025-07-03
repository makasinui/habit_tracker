<template>
    <input v-model="modelValue" class="input" type="text">
</template>

<script lang="ts" setup>
const modelValue = defineModel<string>({ default: '' });
</script>

<style lang="scss">
@use '/styles/mixins' as *;

.input {
    border: 1px solid #EDEDED;
    border-radius: toRem(4);
    width: 100%;
    height: toRem(45);
    padding: 0 toRem(10);
    transition: 0.3s border-color;

    &:hover {
        border-color: #a5a4a4;
    }

    &:active, &:focus {
        border-color: #a89f9f;
        outline: 0;
    }
}
</style>