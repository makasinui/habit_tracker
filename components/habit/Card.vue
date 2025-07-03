<template>
    <article
        class="habit__card"
        :class="{ 'habit__card-completed': isCompleted }"
        @click="onChangeCompleted"
    >
        <div class="habit__card-info">
            <h3 class="habit__card-title">{{ title }}</h3>
            <div class="habit__card-controls">
                <UiCheckbox
                    v-model="isCompleted"
                    @update:model-value="onChangeCompleted"
                />
                <Icon
                    name="material-symbols:more-vert"
                    size="20"
                    class="pointer"
                    @click.stop="openMore"
                />
                <UiDropdownOptions
                    :is-open="isOpenDetail"
                    :options="actions"
                    @close="isOpenDetail = false"
                />
            </div>
        </div>
    </article>
</template>

<script lang="ts" setup>
interface HabitCardProps {
    id: number;
    title: string;
    completed: boolean;
    description?: string;
}

const statisticStore = useStatisticStore();

const { getTodayIsCompleted } = statisticStore;

const props = defineProps<HabitCardProps>();
const isCompleted = ref(getTodayIsCompleted(props.id));
const isOpenDetail = ref(false);

const actions = [
    { id: '1', label: 'Edit' },
    { id: '2', label: 'Delete' },
];

const openMore = () => {
    isOpenDetail.value = !isOpenDetail.value;
};

const onChangeCompleted = () => {
    isCompleted.value = !isCompleted.value;
};
</script>

<style lang="scss">
$green: #edfff4;
$primary: #fbfbfb;

.habit__card {
    background: $primary;
    border-radius: 15px;
    padding: 0.8rem 0.5rem;
    transition: 0.3s background-color;

    &:hover {
        background: $green;
    }

    &-completed {
        background: $green;

        .habit__card-title {
            color: #37C871;
        }
    }

    &-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    &-controls {
        display: flex;
        align-items: center;
        position: relative;
    }
    &-title {
        font-size: 16px;
        font-weight: 400;

    }
}
</style>
