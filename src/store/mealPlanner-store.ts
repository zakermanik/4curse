import { defineStore } from 'pinia';
import { mealPlanner } from '../services/api';
import type { mealItem, nutrients } from '../interfaces/IMealItem';
import type { generateMealParams } from '../interfaces/IQueryParams';

export const useMealPlannerStore = defineStore("mealPlanner-store", {
  state: () => ({
    dayMealPlan: {
      meals: [] as mealItem[],
      nutrients: {} as nutrients,
    }, 
    weekMealPlan: {
      monday: {
        meals: [] as mealItem[],
        nutrients: {} as nutrients,
      },
      tuesday: {
        meals: [] as mealItem[],
        nutrients: {} as nutrients,
      },
      wednesday: {
        meals: [] as mealItem[],
        nutrients: {} as nutrients,
      },
      thursday: {
        meals: [] as mealItem[],
        nutrients: {} as nutrients,
      },
      friday: {
        meals: [] as mealItem[],
        nutrients: {} as nutrients,
      },
      saturday: {
        meals: [] as mealItem[],
        nutrients: {} as nutrients,
      },
      sunday: {
        meals: [] as mealItem[],
        nutrients: {} as nutrients,
      },
    },
    isLoading: false,
  }),
  actions: {
    async generateMealPlan(params: generateMealParams) {
      this.isLoading = true;
      try {
        const { data } = await mealPlanner.getGeneratedMealPlan(params);
        if (data.meals) {
          this.dayMealPlan = data;
        } else {
          this.weekMealPlan = data.week;
        }
      } catch (error: any) {
        console.error('Ошибка в получении плана питания!: ', error.message);
        throw error;
      } finally {
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
      }
    },
  }
});