<template>
    <div class="add-habit">
        <Icon name="fluent-color:add-circle-24" size="75" />
    </div>
</template>

<style lang="scss">
@use '/styles/mixins' as *;

.add-habit {
    position: fixed;
    bottom: toRem(30);
    right: toRem(50);
}
</style>