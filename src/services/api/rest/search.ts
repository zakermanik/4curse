import makeRequest from "../httpClient";

const apiKey = "9c7b2a7b20754f48a4e90939d12e619e"

export const fetchSearchRecipes = (params: object) =>
    makeRequest({
        url: `https://api.spoonacular.com/recipes/complexSearch`,
        method: "GET",
        params,
        headers: {
            "x-api-key": apiKey,
        },
    });
    
// export const fetchSearchRecipesByIngredients = (ingredients: string, number: number, limitLicense: boolean, ranking: number, ignorePantry: boolean) =>
//     makeRequest({
//         url: `https://api.spoonacular.com/recipes/findByIngredients`,
//         method: "GET",
//         params: {
//             ingredients,
//             number,
//             limitLicense,
//             ranking,
//             ignorePantry,
//         },
//         headers: {
//             "x-api-key": apiKey,
//         },
//     });