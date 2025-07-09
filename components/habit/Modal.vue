<template>
    <UiModal
        v-model="isOpenModal"
        :title="modalTitle"
        @update:model-value="onClose"
    >
        <div class="modal__habit-content">
            <UiFormField
                v-model="form.goal"
                label="Your Goal"
                :error="vform$.goal.$errors"
            />
            <UiFormField
                v-model="form.title"
                label="Habit Name"
                :error="vform$.title.$errors"
            />
            <UiDropdownField
                v-model="form.period"
                label="Period"
                title="Period"
                :options="periodOptions"
                :error="vform$.period.$errors"
            />
            <UiDropdownField
                v-model="form.type"
                label="Habit Type"
                title="Type"
                :options="typeOptions"
                :error="vform$.type.$errors"
            />
            <UiButton @click="onSave">
                {{ buttonText }}
            </UiButton>
        </div>
    </UiModal>
</template>

<script lang="ts" setup>
import { useModal } from './composables/modal';

const modalStore = useModalStore();

const { isOpenModal } = storeToRefs(modalStore);

const { 
    form, 
    vform$, 
    periodOptions, 
    typeOptions, 
    modalTitle, 
    buttonText, 
    onClose,
    onSave,
} = useModal();

watch(() => isOpenModal.value, (val) => console.log('open', val))
</script>

<style lang="scss" scoped>
@use '/styles/mixins' as *;

.modal__habit-content {
    display: flex;
    flex-direction: column;
    margin-top: toRem(15);
    gap: toRem(15);
}
</style>
