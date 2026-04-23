const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export interface Ingredient {
  idIngredient: string;
  strIngredient: string;
  strDescription: string | null;
  strThumb: string | null;
  strType: string | null;
}

export interface MealSummary {
  strMeal: string;
  strMealThumb: string;
  idMeal: string;
}

export interface MealDetail extends MealSummary {
  strInstructions: string;
  strYoutube: string;
  strCategory: string;
  strArea: string;
  [key: string]: string | null | undefined;
}

export const mealApi = {
  async getIngredients(): Promise<Ingredient[]> {
    const res = await fetch(`${BASE_URL}/list.php?i=list`);
    const data = await res.json();
    return data.meals || [];
  },

  async getMealsByIngredient(ingredient: string): Promise<MealSummary[]> {
    const res = await fetch(`${BASE_URL}/filter.php?i=${ingredient}`);
    const data = await res.json();
    return data.meals || [];
  },

  async getMealById(id: string): Promise<MealDetail | null> {
    const res = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
    const data = await res.json();
    return data.meals ? data.meals[0] : null;
  }
};
