import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import dayjs from 'dayjs';
import { HabitModalType, type Habit, type HabitForm } from '~/types';

export const useModal = () => {
    const { periodOptions, typeOptions } = useOptions();
    const modalStore = useModalStore();
    const habitStore = useHabitStore();

    const { modalType, currentHabit } = storeToRefs(modalStore);

    const isCreateType = computed(() => modalType.value === HabitModalType.CREATE);
    const modalTitle = computed(() => (isCreateType.value ? 'Create new Habit' : 'Edit Habit'));

    const buttonText = computed(() => (isCreateType.value ? 'Create' : 'Update'));

    const form = reactive<HabitForm>({
        goal: '',
        title: '',
        period: periodOptions.value[0],
        type: typeOptions.value[0],
        startDate: dayjs(),
    });

    const clearForm = () => {
        form.goal = '';
        form.title = '';
        form.period = periodOptions.value[0];
        form.type = typeOptions.value[0];
        form.startDate = dayjs();

        vform$.value.$reset();
    };

    const onInit = (habit: Habit) => {
        form.goal = habit.goal;
        form.title = habit.title;
        form.startDate = habit.startDate;
        form.id = habit.id;
        
        const type = typeOptions.value.find((item) => item.id === habit.type);
        const period = periodOptions.value.find((item) => item.id === habit.period);

        if (type && period) {
            form.type = type;
            form.period = period;
        }
    };

    const onClose = () => {
        clearForm();
        modalStore.onChangeVisibilityModal(false);
    };

    const onSave = async () => {
        const isValid = await vform$.value.$validate();

        if (!isValid) {
            return;
        }

        if(form?.id) {
            habitStore.updateHabit(form as Required<HabitForm>);
        } else {
            habitStore.addHabit(form);
        }

        onClose();
    };

    const rules = {
        goal: { required },
        title: { required },
        period: { required },
        type: { required },
    };

    const vform$ = useVuelidate(rules, form, { $autoDirty: true });

    watch(
        () => currentHabit.value,
        (val) => {
            if (val) {
                onInit(val);
            }
        },
    );

    return {
        form,
        vform$,
        periodOptions,
        typeOptions,
        modalTitle,
        buttonText,
        clearForm,
        onClose,
        onSave,
        onInit,
    };
};
