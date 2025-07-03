import { type  DropdownOption, HabitPeriod, HabitType } from '~/types';

export const useOptions = () => {
    const periodOptions: Ref<DropdownOption[]> = computed(() =>
        Object.values(HabitPeriod).map((period) => ({
            id: period,
            label: firstCharToUppercase(period),
        })),
    );

    const typeOptions: Ref<DropdownOption[]> = computed(() =>
        Object.values(HabitType).map((type) => ({
            id: type,
            label: firstCharToUppercase(type),
        })),
    );

    return {
        periodOptions,
        typeOptions
    };
};
