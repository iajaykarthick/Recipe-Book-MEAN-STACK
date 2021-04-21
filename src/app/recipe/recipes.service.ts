import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { Recipe } from "./recipe.model";

import { environment } from "../../environments/environment";

const BACKEND_URL = environment.apiUrl + "/recipes/";

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private recipesBook: Recipe[] = [];

  private recipesUpdated = new Subject<Recipe[]>();

  constructor(private http: HttpClient, private router: Router) {}

  addRecipe(recipeId: string, recipeName: string, style: string, ingredients: [], servings: number, cookingTime: string, calories: string, image: File ) {
    const recipe = new FormData();
    recipe.append('id', recipeId);
    recipe.append('recipeName', recipeName);
    recipe.append('style', style);
    recipe.append('ingredients', JSON.stringify(ingredients));
    recipe.append('servings', servings.toString());
    recipe.append('cookingTime', cookingTime);
    recipe.append('calories', calories);
    recipe.append('image', image, recipeName);

    this.http.post<{recipe: any}>(BACKEND_URL, recipe)
      .subscribe(responseData => {
        console.log(responseData.recipe);
      });
      this.router.navigate(["/"]);
  }

  getRecipes() {
    this.http.get<{recipes: Recipe[]}>(BACKEND_URL)
      .subscribe(responseData => {
        console.log(responseData.recipes);
        this.recipesBook = responseData.recipes;
          this.recipesUpdated.next( [...this.recipesBook] );
      });
  }

  deleteRecipe(recipeId: string) {
    return this.http.delete(BACKEND_URL + recipeId);
  }

  getRecipesUpdatedListener() {
    return this.recipesUpdated.asObservable();
  }

}
