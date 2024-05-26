export interface complexSearchParams {
    query?: string
    offset?: number
    number?: number
    diet?: string
    cuisine?: string
    equipment?: string
    includeIngredients?: string
    excludeIngredients?: string
}
export interface generateMealParams {
    timeFrame: string
    targetCalories: number
    diet: string
    exclude: string
}