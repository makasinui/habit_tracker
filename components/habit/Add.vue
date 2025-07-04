<template>
    <div class="add-habit pointer" @click="onChangeCreateModal(true)">
        <Icon name="fluent-color:add-circle-24" size="75" />
    </div>
</template>

<script lang="ts" setup>
const habitStore = useHabitStore();
const { onChangeCreateModal } = habitStore;
</script>

<style lang="scss">
@use '/styles/mixins' as *;

.add-habit {
    position: fixed;
    bottom: toRem(30);
    right: toRem(50);
}
</style>