export interface Recipe {
  id: string;
  recipeName: string;
  style: string;
  ingredients: Ingredients[];
  servings: number;
  cookingTime: string;
  calories: string;
}

export interface Ingredients {
  ingredientName: string;
  quantity: string;
}
