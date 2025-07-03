<template>
    <button class="button">
        <slot/>
    </button>
</template>

<script lang="ts" setup>

</script>

<style lang="scss">
@use '~/styles/variables' as *;
@use '~/styles/mixins' as *;

.button {
    padding: toRem(15) 0;
    font-size: toRem(14);
    color: #fff;
    background: $main-color;
    border: 0;
    border-radius: toRem(8);
    font-weight: 600;
    cursor: pointer;
    transition: 0.3s background-color;

    &:hover {
        background: $main-color-hover;
    }
}
</style>