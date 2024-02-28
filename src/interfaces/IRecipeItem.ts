export interface IRecipeItem {
    id: number;
    title: string,
    summary: string,
    image: string,
    dishType: string[],
    readyInMinutes: number,
    servings: number,
    instructions: string,
}