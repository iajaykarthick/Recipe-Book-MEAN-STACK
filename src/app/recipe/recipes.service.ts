import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private recipesBook: Recipe[] = [];

  constructor(private http: HttpClient) {}

  addRecipe(recipe: Recipe) {
    this.http.post<{recipe: any}>('http://localhost:3000/api/recipes', recipe)
      .subscribe(responseData => {
        console.log(responseData.recipe);
      });
  }

  getRecipes() {
    this.http.get('http://localhost:3000/api/recipes')
      .subscribe(responseData => {
        console.log(responseData);
      });
  }
}
