<template>
  <div class="flex justify-center px-10 pt-8">
    <div class="w-[1024px]">
      <el-header class="flex h-[150px]">
        <SearchMenu />
      </el-header>
      <div class="flex">
        <div class="w-[340px]">
          <el-scrollbar class="h-[720px]">
            <RecipeListSearch :recipes="recipesStore.searchingRecipes" />
          </el-scrollbar>
        </div>
        <el-main class="p-0 w-[648px]">
          <router-view></router-view>
        </el-main>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import RecipeListSearch from '../components/RecipesListSearch.vue'
import SearchMenu from '../components/SearchMenu.vue'

import { useRecipesStore } from '../store/recipes-store';

const recipesStore = useRecipesStore();
</script>