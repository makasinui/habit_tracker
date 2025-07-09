import { HabitModalType, type Habit } from "~/types";

export const useModalStore = defineStore('modal', () => {
    const isOpenModal = ref(false);

    const modalType = ref<HabitModalType>(HabitModalType.CREATE);
    const currentHabit = ref<Habit | null>();

    const onChangeVisibilityModal = (value: boolean, type?: HabitModalType, habit?: Habit) => {
        isOpenModal.value = value;

        if (habit?.id && type) {
            modalType.value = type;
            currentHabit.value = habit;
            return;
        }

        currentHabit.value = null;
        modalType.value = HabitModalType.CREATE;
    };

    return {
        isOpenModal,
        modalType,
        currentHabit,
        onChangeVisibilityModal
    }
});
