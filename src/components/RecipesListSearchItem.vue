<template>
  <div @click="handleClick">
    <div class="list-item-main w-[300px] h-[100px] z-10 relative rounded-lg shadow-md cursor-pointer"
      v-show="!recipesStore.isLoadingSearchRecipe">
      <div class="absolute z-10 p-3">
        <p class="text-[16px] font-bold">{{ recipe.title }}</p>
      </div>
      <div class="relative overflow-hidden rounded-lg h-[100%] gradient">
        <img class="z-[-1] relative rounded-lg" :src="recipe.image" alt="Recipe Image" />
      </div>
    </div>
    <div style="width: 300px; height: 100px;" v-show="recipesStore.isLoadingSearchRecipe">
      <el-skeleton style="width: 300px; height: 100px;" animated>
        <template #template>
          <div>
            <el-skeleton-item variant="p" style="width: 100%;" />
          </div>
          <el-skeleton-item variant="image" style="width: 300px; height: 75px;" />
        </template>
      </el-skeleton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';
import { IRecipeItem } from '../interfaces/IRecipeItem';
import { useRecipesStore } from '../store/recipes-store';

interface Props {
  recipe: IRecipeItem;
}
const props = defineProps<Props>();
const { recipe } = toRefs(props);

const recipesStore = useRecipesStore();

const handleClick = async () => {
  recipesStore.recipe_ID = recipe.value.id;
};
</script>

<style lang="scss" scoped>
.gradient {
  background: linear-gradient(180deg, rgba(255, 255, 255, 1) 20%, rgba(255, 255, 255, 0) 90%);
}
.list-item-main:hover {
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, .5);
}
</style>