import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import dayjs from 'dayjs';
import { HabitModalType, type HabitForm } from '~/types';

export const useModal = (modalType: HabitModalType) => {
    const { periodOptions, typeOptions } = useOptions();

    const isCreateType = computed(() => modalType === HabitModalType.CREATE);

    const modalTitle = computed(
        () => isCreateType.value
        ? 'Create new Habit'
        : 'Edit Habit'
    );

    const buttonText = computed(
        () => isCreateType.value 
        ? 'Create'
        : 'Update'
    )

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

    const rules = {
        goal: { required },
        title: { required },
        period: { required },
        type: { required },
    };

    const vform$ = useVuelidate(rules, form, { $autoDirty: true });

    return {
        form,
        vform$,
        clearForm,
        periodOptions,
        typeOptions,
        modalTitle,
        buttonText
    };
};
