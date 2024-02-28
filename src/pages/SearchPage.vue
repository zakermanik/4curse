<template>
  <div class="px-10 pt-8">
    <el-container>
      <el-header class="h-[150px]">
        <SearchMenu />
      </el-header>
      <el-container>
        <el-aside class="w-[340px]">
          <el-scrollbar class="h-[720px]">
            <RecipeListSearch :recipes="recipesStore.searchingRecipes" />
          </el-scrollbar>
        </el-aside>
        <el-main class="p-0">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import RecipeListSearch from '../components/RecipesListSearch.vue'
import SearchMenu from '../components/SearchMenu.vue'

import { useRecipesStore } from '../store/recipes-store';

const recipesStore = useRecipesStore();
</script>