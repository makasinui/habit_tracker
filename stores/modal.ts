import { HabitModalType, type Habit } from "~/types";

export const useModalStore = defineStore('modal', () => {
    const isOpenModal = ref(false);
    const modalType = ref<HabitModalType>(HabitModalType.CREATE);
    const currentHabit = ref<Habit>();

    const onChangeVisibilityModal = (value: boolean, habit?: Habit) => {
        isOpenModal.value = value;

        if (habit?.id) {
            modalType.value = HabitModalType.EDIT;
            currentHabit.value = habit;
            return;
        }

        currentHabit.value = undefined;
        modalType.value = HabitModalType.CREATE;
    };

    return {
        isOpenModal,
        modalType,
        currentHabit,
        onChangeVisibilityModal
    }
});
