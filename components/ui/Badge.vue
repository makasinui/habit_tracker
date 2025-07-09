<template>
    <div
        class="badge"
        :class="[`badge--${color}`]"
    >
        <slot />
    </div>
</template>

<script lang="ts" setup>
interface BadgeProps {
    color?: 'green' | 'gray';
}

withDefaults(defineProps<BadgeProps>(), {
    color: 'gray',
});
</script>

<style lang="scss">
@use '/styles/mixins' as *;

.badge {
    padding: toRem(2) toRem(10);
    width: fit-content;
    border-radius: toRem(35);
    &--gray {
        color: #959595;
        background: #95959550;
    }

    &--green {
        color: #37C871;
        background: #D7FFE7;
    }
}
</style>
