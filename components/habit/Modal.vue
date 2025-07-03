<template>
    <UiModal
        v-model="isOpenCreateModal"
        title="Create new Habit"
        @update:model-value="onChangeCreateModal"
    >
        asd
    </UiModal>
</template>

<script lang="ts" setup>
const habitStore = useHabitStore();

const { isOpenCreateModal } = storeToRefs(habitStore);
const { onChangeCreateModal } = habitStore;
</script>
