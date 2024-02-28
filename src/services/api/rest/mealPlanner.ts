import makeRequest from "../httpClient";

const apiKey = "9c7b2a7b20754f48a4e90939d12e619e"

export const fetchRandomRecipes = (numberOfRecipes: number) =>
    makeRequest({
        url: `https://api.spoonacular.com/recipes/random?number=${numberOfRecipes}`,
        method: "GET",
        headers: {
            "x-api-key": apiKey,
        },
    });
export const getGeneratedMealPlan = (timeFrame: string, targetCalories: number, diet: string, exclude: string) =>
    makeRequest({
        url: `https://api.spoonacular.com/mealplanner/generate`,
        method: "GET",
        params: {
            timeFrame,
            targetCalories,
            diet,
            exclude,
        },
        headers: {
            "x-api-key": apiKey,
        },
    });