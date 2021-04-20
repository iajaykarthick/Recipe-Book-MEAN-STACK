export interface Recipe {
  _id: string;
  recipeName: string;
  style: string;
  ingredients: Ingredients[];
  servings: number;
  cookingTime: string;
  calories: string;
  imagePath: string;
}

export interface Ingredients {
  ingredientName: string;
  quantity: string;
}
