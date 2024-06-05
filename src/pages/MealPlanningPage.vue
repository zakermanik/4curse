<template>
  <h1 class="pb-2 my-6 text-3xl font-bold text-center text-gray-800 border-b-4 border-blue-500">
    Meal Planning
</h1>

  <div class="max-w-4xl p-6 mx-auto bg-white rounded-lg shadow-md">
    <el-form class="grid grid-cols-2 gap-1" label-position="top">
      <el-form-item label="Day or Week">
        <el-select v-model="queryParams.timeFrame" placeholder="Time Frame">
          <el-option label="Day" value="day" />
          <el-option label="Week" value="week" />
        </el-select>
      </el-form-item>
      <el-form-item label="Calories">
        <el-input v-model="queryParams.targetCalories" placeholder="Target Calories"></el-input>
      </el-form-item>
      <el-form-item label="Diet" class="col-span-full">
        <el-checkbox-group v-model="selectedDiet">
          <el-checkbox-button label="vegetarian">Vegetarian</el-checkbox-button>
          <el-checkbox-button label="gluten free">Gluten Free</el-checkbox-button>
          <el-checkbox-button label="vegan">Vegan</el-checkbox-button>
          <el-checkbox-button label="pescetarian">Pescetarian</el-checkbox-button>
          <el-checkbox-button label="ketogenic">Ketogenic</el-checkbox-button>
          <el-checkbox-button label="paleo">Paleo</el-checkbox-button>
          <el-checkbox-button label="primal">Primal</el-checkbox-button>
          <el-checkbox-button label="whole30">Whole30</el-checkbox-button>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="Exclude ingredients" class="col-span-full">
        <el-select v-model="queryParams.exclude" placeholder="Exclude" multiple>
          <el-option v-for="ingredient in availableIngredients" :key="ingredient.id" :label="ingredient.name" :value="ingredient.name">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="text-right col-span-full">
        <el-button @click="loadMealPlan">Generate Meal Plan</el-button>
      </el-form-item>
    </el-form>
  </div>

  <div class="p-10">
    <div v-if="mealPlannerStore.dayMealPlan.meals.length && queryParams.timeFrame === 'day'"
      class="max-w-4xl p-6 mx-auto bg-white rounded-lg shadow-md">
      <h2 class="mb-6 text-3xl font-bold text-gray-800">Day Meal Plan</h2>
      <div v-for="(meal, index) in mealPlannerStore.dayMealPlan.meals" :key="meal.id"
        class="p-4 mb-6 bg-gray-100 rounded-lg">
        <div class="flex items-center justify-between mb-4">
          <span class="text-xl font-bold text-gray-800">Meal {{ index + 1 }}</span>
        </div>
        <p class="text-gray-700">
          <span class="font-bold text-gray-800">Title:</span> {{ meal.title }}
        </p>
        <p class="text-gray-700">
          <span class="font-bold text-gray-800">Ready In Minutes:</span> {{ meal.readyInMinutes }}
        </p>
        <p class="text-gray-700">
          <span class="font-bold text-gray-800">Servings:</span> {{ meal.servings }}
        </p>
        <a :href="meal.sourceUrl" target="_blank" class="text-blue-500 hover:underline">View Recipe</a>
      </div>
      <div class="p-4 mt-6 bg-blue-100 rounded-lg">
        <h3 class="mb-4 text-2xl font-bold text-gray-800">Nutritional Information</h3>
        <p class="text-gray-700">
          <span class="font-bold text-gray-800">Calories:</span> {{ mealPlannerStore.dayMealPlan.nutrients.calories }}
        </p>
        <p class="text-gray-700">
          <span class="font-bold text-gray-800">Carbohydrates:</span> {{
          mealPlannerStore.dayMealPlan.nutrients.carbohydrates }}
        </p>
        <p class="text-gray-700">
          <span class="font-bold text-gray-800">Fat:</span> {{ mealPlannerStore.dayMealPlan.nutrients.fat }}
        </p>
        <p class="text-gray-700">
          <span class="font-bold text-gray-800">Protein:</span> {{ mealPlannerStore.dayMealPlan.nutrients.protein }}
        </p>
      </div>
    </div>

    <div v-if="mealPlannerStore.weekMealPlan.monday.meals.length && queryParams.timeFrame === 'week'"
      class="flex flex-col gap-5">
      <div class="grid w-full max-w-6xl grid-cols-1 gap-6 mx-auto md:grid-cols-2 lg:grid-cols-3">
        <div v-for="(day, key) in mealPlannerStore.weekMealPlan"
          class="flex flex-col gap-5 p-6 bg-white rounded-lg shadow-md">
          <p class="mb-4">
            <span class="text-2xl font-bold text-gray-800">{{ key }}</span>
          </p>
          <div v-for="(meal, index) in day.meals" class="p-4 mb-4 bg-gray-100 rounded-lg">
            <div class="flex items-center justify-between mb-2">
              <span class="text-xl font-bold text-gray-800">{{ index + 1 }}</span>
            </div>
            <p class="text-gray-700">
              <span class="font-bold text-gray-800">Title:</span> {{ meal.title }}
            </p>
            <p class="text-gray-700">
              <span class="font-bold text-gray-800">ReadyInMinutes:</span> {{ meal.readyInMinutes }}
            </p>
            <p class="text-gray-700">
              <span class="font-bold text-gray-800">Servings:</span> {{ meal.servings }}
            </p>
          </div>
          <div class="p-4 mt-4 bg-blue-100 rounded-lg">
            <p class="text-gray-700">
              <span class="font-bold text-gray-800">Calories:</span> {{ day.nutrients.calories }}
            </p>
            <p class="text-gray-700">
              <span class="font-bold text-gray-800">Carbohydrates:</span> {{ day.nutrients.carbohydrates }}
            </p>
            <p class="text-gray-700">
              <span class="font-bold text-gray-800">Fat:</span> {{ day.nutrients.fat }}
            </p>
            <p class="text-gray-700">
              <span class="font-bold text-gray-800">Protein:</span> {{ day.nutrients.protein }}
            </p>
          </div>
        </div>
      </div>
    </div>
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

const availableIngredients = [
  { id: 1, name: "Salt" },
  { id: 2, name: "Pepper" },
  { id: 3, name: "Olive Oil" },
  { id: 4, name: "Onion" },
  { id: 5, name: "Garlic" },
  { id: 6, name: "Chicken Breast" },
  { id: 7, name: "Beef" },
  { id: 8, name: "Pork" },
  { id: 9, name: "Lamb" },
  { id: 10, name: "Shrimp" },
  { id: 11, name: "Tomato" },
  { id: 12, name: "Potato" },
  { id: 13, name: "Broccoli" },
  { id: 14, name: "Spinach" },
  { id: 15, name: "Carrot" },
];

const loadMealPlan = async () => {
  queryParams.value.diet = selectedDiet.value.join(',')
  await mealPlannerStore.generateMealPlan(queryParams.value);
};
</script>