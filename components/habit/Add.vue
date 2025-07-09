<template>
    <div class="add-habit pointer" @click="onChangeVisibilityModal(true)">
        <Icon name="fluent-color:add-circle-24" size="75" />
    </div>
</template>

<script lang="ts" setup>
const modalStore = useModalStore();
const { onChangeVisibilityModal } = modalStore;
</script>

<style lang="scss">
@use '/styles/mixins' as *;

.add-habit {
    position: fixed;
    bottom: toRem(30);
    right: toRem(50);
}
</style>