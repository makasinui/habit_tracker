import { type  DropdownOption, HabitPeriod, HabitType } from '~/types';

export const useOptions = () => {
    const periodOptions: Ref<DropdownOption[]> = computed(() =>
        Object.values(HabitPeriod).map((period, i) => ({
            id: i,
            label: period,
        })),
    );

    const typeOptions: Ref<DropdownOption[]> = computed(() =>
        Object.values(HabitType).map((type, i) => ({
            id: i,
            label: type,
        })),
    );

    return {
        periodOptions,
        typeOptions
    };
};
