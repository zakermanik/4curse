import { RouteRecordRaw } from "vue-router";
import MainPage from "../pages/MainPage.vue"
import RecipesListPage from "../pages/RecipesListPage.vue"
import RecipeItemPage from "../pages/RecipeItemPage.vue"
import MealPlanningPage from "../pages/MealPlanningPage.vue"
import SearchPage from "../pages/SearchPage.vue"
import SearchItemPage from "../pages/SearchItemPage.vue"

const routes: readonly RouteRecordRaw[] = [
    {
        path: "/",
        name: "Main",
        component: MainPage
    },
    {
        path: "/recipes",
        component: RecipesListPage,
        children: [
            {
                path: ":id",
                name: "recipe",
                component: RecipeItemPage,
            },
        ],
    },
    {
        path: "/meal_planning",
        name: "Meal Planning",
        component: MealPlanningPage,
    },
    {
        path: "/search",
        name: "Search",
        component: SearchPage,
        children: [
            {
                path: "recipes/:id",
                name: "searchRecipe",
                component: SearchItemPage,
            },
        ],
    }
]

export default routes