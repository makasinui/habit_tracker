import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import dayjs from 'dayjs';
import type { HabitForm } from '~/types';

export const useModal = () => {
    const { periodOptions, typeOptions } = useOptions();

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
    };
};
