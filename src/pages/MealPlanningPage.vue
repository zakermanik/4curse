<template>
  <h1 class="text-3xl font-bold underline">
    Meal Planning
  </h1>
  <router-view></router-view>
  <div class="w-[100px]">
    <el-form class="flex w-[1024px] justify-between" label-position="top">
      <el-form-item label="Day or Week">
        <el-select class="w-[100px]" v-model="queryParams.timeFrame" placeholder="Time Frame">
          <el-option label="Day" value="day" />
          <el-option label="Week" value="week" />
        </el-select>
      </el-form-item>
      <el-form-item label="Calories">
        <el-input v-model="queryParams.targetCalories" placeholder="Target Calories"></el-input>
      </el-form-item>
      <el-form-item label="Diet">
        <el-checkbox-group class="flex" v-model="selectedDiet">
          <el-checkbox-button label="vegetarian">Vegetarian</el-checkbox-button>
          <el-checkbox-button label="gluten free">Gluten Free</el-checkbox-button>
          <el-checkbox-button label="vegan">Vegan</el-checkbox-button>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="Exclude ingredients">
        <el-input v-model="queryParams.exclude" placeholder="Exclude"></el-input>
      </el-form-item>
      <el-form-item label="Submit">
        <el-button @click="loadMealPlan">Generate Meal Plan</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { useMealPlannerStore } from '../store/mealPlanner-store';
import type { generateMealParams } from '../interfaces/IQueryParams';
import { ref } from 'vue';
const mealPlannerStore = useMealPlannerStore();

const selectedDiet = ref<string[]>([])

const queryParams = ref<generateMealParams>({
  timeFrame: 'day',
  targetCalories: 2000,
  diet: '',
  exclude: '',
})

const loadMealPlan = async () => {
  queryParams.value.diet = selectedDiet.value.join(',')
  await mealPlannerStore.generateMealPlan(queryParams.value);
  console.log(mealPlannerStore.dayMealPlan)
  console.log(mealPlannerStore.weekMealPlan)
};
</script>