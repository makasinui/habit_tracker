<template>
    <Transition name="modal-fade">
        <Teleport
            v-if="modelValue"
            to="body"
        >
            <article class="modal">
                <div class="modal__wrapper">
                    <div class="modal__content">
                        <header class="modal__header">
                            <h3 class="modal__header-title">{{ title }}</h3>
                            <Icon
                                name="line-md:close"
                                size="20"
                                @click="modelValue = false"
                            />
                        </header>
                        <div class="modal__body">
                            <slot />
                        </div>
                    </div>
                </div>
            </article>
        </Teleport>
    </Transition>
</template>

<script lang="ts" setup>
interface ModalProps {
    title: string;
}

defineProps<ModalProps>();
const modelValue = defineModel<boolean>({ default: false });
</script>

<style lang="scss">
@use '/styles/mixins' as *;

.modal {
    position: fixed;
    width: 100%;
    height: 100%;
    background: #cbcbcb;
    opacity: 0.95;
    top: 0;
    z-index: 100000;

    &__wrapper {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        padding: 0 toRem(22);
        width: 100%;
    }

    &__content {
        background: #FCFCFF;
        padding: toRem(15);
        border-radius: toRem(6);
    }

    &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #E0E0E0;
        padding-bottom: toRem(10);

        &-title {
            font-size: toRem(21);
        }
    }

    &__body {
        margin-top: toRem(22);
    }

    &-fade {
        transition: 0.3s all;
    
        &-enter-active, &-leave-active {
            transition: opacity 0.5s ease-in-out;
        }
    
        &-enter-from, &-leave-to {
            opacity: 0;
        }
    }
}
</style>
