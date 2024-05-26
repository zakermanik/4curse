<template>
  <el-form :model="queryParams" class="w-[1024px]">
    <el-form-item>
      <div class="flex justify-center w-full">
        <el-input size="large" class="w-[500px]" v-model="queryParams.query" placeholder="Please input" clearable
          :suffix-icon="Search" />
      </div>
    </el-form-item>
    <div class="flex gap-2">
      <el-form-item>
        <el-select class="w-[100px]" v-model="queryParams.cuisine" placeholder="Cuisine" clearable>
          <el-option v-for="cuisine in cuisines" :label="cuisine.label" :value="cuisine.label.toLowerCase()"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-checkbox-group class="flex" v-model="selectedDiet">
          <el-checkbox-button label="vegetarian">Vegetarian</el-checkbox-button>
          <el-checkbox-button label="gluten free">Gluten Free</el-checkbox-button>
          <el-checkbox-button label="vegan">Vegan</el-checkbox-button>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-input v-model="queryParams.equipment" placeholder="Equipment" clearable />
      </el-form-item>
      <el-form-item>
        <el-input v-model="queryParams.includeIngredients" placeholder="Included Ingredients" clearable />
      </el-form-item>
      <el-form-item>
        <el-input v-model="queryParams.excludeIngredients" placeholder="Excluded Ingredients" clearable />
      </el-form-item>
    </div>
    <div class="flex items-center gap-2">
      <el-pagination class="border" layout="prev, pager, next" @current-change="handlePageChange" :current-page="currentPage"
        :page-size="queryParams.number" :total="recipesStore.totalResults"></el-pagination>
      <el-select class="w-[100px]" v-model="queryParams.number">
        <el-option selected label="10" value="10"></el-option>
        <el-option label="20" value="20"></el-option>
        <el-option label="30" value="30"></el-option>
      </el-select>
      <el-button disabled>Total resulst - {{ recipesStore.totalResults }}</el-button>
    </div>
    <div class="pagination">
    </div>
  </el-form>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { Search } from '@element-plus/icons-vue'
import { useRecipesStore } from '../store/recipes-store';
import { complexSearchParams } from '../interfaces/IQueryParams';
import { debounce } from 'lodash';

const recipesStore = useRecipesStore();

const recipeNumber = ref(10);
const cuisines = [
  {
    label: 'Asian',
  },
  {
    label: 'Eastern European',
  },
  {
    label: 'French',
  },
  {
    label: 'Indian',
  },
  {
    label: 'Italian',
  },
  {
    label: 'Mexican',
  },
  {
    label: 'Spanish',
  },
  {
    label: 'Thai',
  },
]
const currentPage = ref(1);
const selectedDiet = ref<string[]>([])

const handlePageChange = async (newPage: number) => {
  currentPage.value = newPage;
};
const queryParams = ref<complexSearchParams>({
  query: '',
  number: 10,
  offset: 0,
  diet: '',
  cuisine: '',
  equipment: '',
  includeIngredients: '',
  excludeIngredients: '',
})

const debouncedHandleSearch = debounce(() => {
  queryParams.value.offset = (currentPage.value - 1) * recipeNumber.value
  queryParams.value.diet = selectedDiet.value.join(', ')
  recipesStore.getSearchRecipes(queryParams.value);
  console.log(selectedDiet.value);
  console.log(queryParams.value);

}, 500);

watch([queryParams, selectedDiet], debouncedHandleSearch, { immediate: true, deep: true });
watch(currentPage, async (newPage) => {
  currentPage.value = newPage;
  await debouncedHandleSearch();
}
);

</script>

<style lang="scss" scoped>
// .container {
//   display: flex;
//   flex-direction: column;
//   background-color: white;

//   .menu {
//     width: 350px;
//     padding: 10px 20px;

//     .input {
//       display: flex;
//     }

//     .checkboxes {
//       display: flex;
//       justify-content: space-between;

//       .el-checkbox {
//         margin-right: 0;
//       }
//     }

//     .select {
//       width: 350px;
//     }

//     .pagination {
//       display: flex;
//       flex-direction: column;
//       align-items: baseline;
//     }
//   }

//   .slider {
//     width: 300px;
//   }
// }
</style>