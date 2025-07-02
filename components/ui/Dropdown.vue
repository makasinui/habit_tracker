<template>
    <div class="dropdown">
        <div
            class="dropdown__wrapper"
            @click.stop="onToggle"
        >
            <h3 class="dropdown__title">{{ getTitle }}</h3>
            <Icon name="bitcoin-icons:cross-outline" @click.stop="onClear" />
        </div>
        <UiDropdownOptions
            :is-open="isOpen"
            :model-value="modelValue"
            :options="options"
            @close="isOpen = false"
        />
    </div>
</template>

<script lang="ts" setup>
import type { DropdownOption } from '~/types/global';

interface DropdownProps {
    title: string;
    options: DropdownOption[];
    open?: boolean;
}

const props = defineProps<DropdownProps>();
const modelValue = defineModel<DropdownOption | null>();

const isOpen = ref(props.open || false);

const getTitle = computed(() => {
    return modelValue.value ? modelValue.value.label : props.title;
});

const onToggle = () => {
    isOpen.value = !isOpen.value;
};

const onClear = () => {
    modelValue.value = null;
    isOpen.value = false;
};
</script>

<style lang="scss">
.dropdown {
    position: relative;
    &__wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        padding: 0.5rem;
        border-radius: 0.25rem;
        gap: 0.5rem;
        border: 1px solid gray;
    }

    &__title {
        font-size: 1rem;
        font-weight: bold;
    }
}
</style>
