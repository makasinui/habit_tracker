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
                    @close="onChooseAction"
                />
            </div>
        </div>
    </article>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs';
import type { DropdownOption } from '~/types';

interface HabitCardProps {
    id: number;
    title: string;
    description?: string;
}

interface HabitCardEmits {
    (event: 'edit'): void
}

const statisticStore = useStatisticStore();

const { getTodayIsCompleted, addToStatistic, removeFromStatistic } = statisticStore;

const props = defineProps<HabitCardProps>();
const emit = defineEmits<HabitCardEmits>();

const isCompleted = ref(getTodayIsCompleted(props.id));
const isOpenDetail = ref(false);

const actions = [
    { id: 1, label: 'Edit' },
    { id: 2, label: 'Delete' },
];

const openMore = () => {
    isOpenDetail.value = !isOpenDetail.value;
};

const onChangeCompleted = () => {
    isCompleted.value = !isCompleted.value;

    if (isCompleted.value) {
        addToStatistic(props.id, dayjs());
    } else {
        removeFromStatistic(props.id, dayjs());
    }

};

const onChooseAction = (action?: DropdownOption | null) => {
    isOpenDetail.value = false;

    if(action?.id === 1) {
        emit('edit');
    } 
    if(action?.id === 2) {
        return;
    }
}
</script>

<style lang="scss">
@use '/styles/mixins' as *;

$green: #edfff4;
$primary: #fbfbfb;

.habit__card {
    background: $primary;
    border-radius: toRem(15);
    padding: 0.8rem 0.5rem;
    transition: 0.3s background-color;

    &:hover {
        background: $green;
    }

    &-completed {
        background: $green;

        .habit__card-title {
            color: #37c871;
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
        font-size: toRem(16);
        font-weight: 400;
    }
}
</style>
