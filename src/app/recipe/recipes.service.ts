import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { Recipe } from "./recipe.model";

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private recipesBook: Recipe[] = [];

  private recipesUpdated = new Subject<Recipe[]>();

  constructor(private http: HttpClient, private router: Router) {}

  addRecipe(recipe: Recipe) {
    this.http.post<{recipe: any}>('http://localhost:3000/api/recipes', recipe)
      .subscribe(responseData => {
        console.log(responseData.recipe);
      });
      this.router.navigate(["/"]);
  }

  getRecipes() {
    this.http.get<{recipes: Recipe[]}>('http://localhost:3000/api/recipes')
      .subscribe(responseData => {
        console.log(responseData.recipes);
        this.recipesBook = responseData.recipes;
          this.recipesUpdated.next( [...this.recipesBook] );
      });
  }

  getRecipesUpdatedListener() {
    return this.recipesUpdated.asObservable();
  }

}
