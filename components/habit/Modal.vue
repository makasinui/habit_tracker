<template>
    <UiModal
        v-model="isOpenCreateModal"
        title="Create new Habit"
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
            <UiButton @click="onSave"> Create </UiButton>
        </div>
    </UiModal>
</template>

<script lang="ts" setup>
import { useModal } from './composables/modal';

const habitStore = useHabitStore();

const { form, vform$, periodOptions, typeOptions, clearForm } = useModal();

const { isOpenCreateModal } = storeToRefs(habitStore);
const { onChangeCreateModal, addHabit } = habitStore;

const onClose = () => {
    clearForm();
    onChangeCreateModal(false);
}

const onSave = async () => {
    const isValid = await vform$.value.$validate();

    if (!isValid) {
        return;
    }

    addHabit(form);
    onClose();
};
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
