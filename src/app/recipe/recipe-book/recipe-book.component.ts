import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from "rxjs";
import { Recipe } from "../recipe.model";
import { RecipesService } from "../recipes.service";

@Component({
  selector: 'app-recipe-book',
  templateUrl: './recipe-book.component.html',
  styleUrls: ['./recipe-book.component.css']
})
export class RecipeBookComponent implements OnInit, OnDestroy {

  private mediaSub: Subscription;
  private recipesSub: Subscription;
  displayedColumns = ['servings', 'cookingTime', 'calories'];
  displayedIngredientColumns = ['ingredientName', 'quantity'];
  panelOpenState: {} = {};
  recipes: Recipe[];
  tableData: {servings: number, cookingTime: string, calories: string}[] = [];

  constructor(private cdRef: ChangeDetectorRef, private mediaObserver: MediaObserver, private recipesService: RecipesService) {}

  ngOnInit(): void {
    this.recipesService.getRecipes();
    this.recipesSub = this.recipesService.getRecipesUpdatedListener()
      .subscribe((fetchedRecipes: Recipe[]) => {
        this.recipes = fetchedRecipes;
        this.recipes.forEach((recipe, index) => {
          console.log(recipe);
          this.panelOpenState[recipe._id] = false;
        });
      });
    this.cdRef.detectChanges();
    this.mediaSub = this.mediaObserver.asObservable()
      .subscribe((changes: MediaChange[]) => {
        changes.forEach(change => {
          console.log(change.mediaQuery, change.mqAlias);
        });
        console.log("----------------------");
      });
  }

  ngOnDestroy() {
    if (this.mediaSub) {
      this.mediaSub.unsubscribe();
    }
    if (this.recipesSub) {
      this.recipesSub.unsubscribe();
    }
  }

  getTableData(recipe: Recipe) {
    return [{servings: recipe.servings, cookingTime: recipe.cookingTime, calories: recipe.calories}];
  }

}
