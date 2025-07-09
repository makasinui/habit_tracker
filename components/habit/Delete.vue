<template>
    <UiModal
        v-if="modalType === HabitModalType.DELETE"
        v-model="isOpenModal"
        title="Delete habit"
        @update:model-value="onClose"
    >
        <div class="modal__habit-delete">
            <h3 class="delete__title">Are you sure you want to delete habit "{{ currentHabit?.title }}"?</h3>
            <UiButton class="delete__button" @click="onDelete">
                Delete
            </UiButton>
        </div>
    </UiModal>
</template>

<script lang="ts" setup>
import { HabitModalType } from '~/types';

const modalStore = useModalStore();
const habitStore = useHabitStore();
const { isOpenModal, currentHabit, modalType } = storeToRefs(modalStore);

const onClose = () => {
    modalStore.onChangeVisibilityModal(false);
}

const onDelete = () => {
    if(currentHabit.value?.id) {
        habitStore.deleteHabit(currentHabit.value.id);
        onClose()
    }
}
</script>

<style lang="scss">
@use '/styles/mixins' as *;

.modal__habit-delete {
    display: flex;
    flex-direction: column;
    
    .delete__button {
        margin-top: toRem(15);
    }
    .delete__title {
        font-size: toRem(18);
        text-align: center;
    }
}
</style>