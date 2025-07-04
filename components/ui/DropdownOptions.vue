<template>
    <Transition
        v-click-outside="onClose"
        name="fade"
        mode="out-in"
    >
        <ul
            v-if="isOpen"
            class="dropdown__options"
        >
            <li
                v-for="option in options"
                :key="option.id"
                class="dropdown__option"
                @click.stop="onSelect(option)"
            >
                {{ option.label }}
            </li>
        </ul>
    </Transition>
</template>
<script lang="ts" setup>
import type { DropdownOption } from '~/types';

interface DropdownOptionsProps {
    options: DropdownOption[];
    isOpen: boolean;
}

interface DropdownOptionsEmits {
    (event: 'close'): void;
}

defineProps<DropdownOptionsProps>();
const emit = defineEmits<DropdownOptionsEmits>();
const modelValue = defineModel<DropdownOption | null>();

const onClose = () => {
    emit('close');
}

const onSelect = (option: DropdownOption) => {
    modelValue.value = option;
    onClose();
}
</script>

<style lang="scss">
.dropdown {
    &__options {
        position: absolute;
        background: #fff;
        z-index: 1000000;
        top: 100%;
        right: 0;
        border-radius: 0.25rem;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        margin-top: 0.5rem;
        padding: 0.5rem;
        list-style: none;
        width: 100%;
        min-width: fit-content;
    }

    &__option {
        padding: 0.5rem;
        cursor: pointer;
        transition: background-color 0.2s ease;

        &:hover {
            background-color: rgba(128, 128, 128, 0.144);
        }
    }
}
</style>
