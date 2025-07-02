<template>
    <div
        class="checkbox"
        @click="onChange"
    >
        <div
            class="checkbox__input"
            :class="{ 'checkbox__input-checked': modelValue }"
        >
            <Icon
                class="checkbox__icon"
                name="material-symbols:check"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
interface CheckboxProps {
    id: string;
}

defineProps<CheckboxProps>();

const modelValue = defineModel<boolean>();

const onChange = () => {
    modelValue.value = !modelValue.value;
};
</script>

<style lang="scss">
$gradient: linear-gradient(to top, #37c871 0%, #5fe394 100%);

.checkbox {
    width: fit-content;
    display: flex;

    &__input {
        cursor: pointer;
        width: 30px;
        height: 30px;
        border: 1px solid #2f2f2f;
        border-radius: 10px;
        background: #fff;
        transition: 0.3s ease-out background-color;

        display: flex;
        justify-content: center;
        align-items: center;

        &:hover {
            background: $gradient;
        }

        &-checked {
            background: $gradient;

            .checkbox__icon {
                display: block;
            }

            &:hover {
                background: #fff;
            }
        }
    }

    &__icon {
        width: 20px;
        height: 20px;
        display: flex;
        color: #fff;
    }
}
</style>
