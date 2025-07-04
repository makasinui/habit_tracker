import { type  DropdownOption, HabitPeriod, HabitType } from '~/types';

export const useOptions = () => {
    const periodOptions: Ref<DropdownOption<HabitPeriod>[]> = computed(() =>
        Object.values(HabitPeriod).map((period) => ({
            id: period,
            label: firstCharToUppercase(period),
        })),
    );

    const typeOptions: Ref<DropdownOption<HabitType>[]> = computed(() =>
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
