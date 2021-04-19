import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Recipe } from "../recipe.model";

@Component({
  selector: 'app-recipe-create',
  templateUrl: './recipe-create.component.html',
  styleUrls: ['./recipe-create.component.css']
})
export class RecipeCreateComponent implements OnInit {

  form: FormGroup;
  ingredients: FormArray;

  recipe: Recipe;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({ // wrapping key inside single quote is optional
      'recipeName': new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      'style': new FormControl(null, {validators: [Validators.required]}),
      'ingredients': this.formBuilder.array([ this.createIngredient() ]),
      'servings': new FormControl(null, {validators: [Validators.required]}),
      'cookingTime': new FormControl(null, {validators: [Validators.required]}),
      'calories': new FormControl(null, {validators: [Validators.required]})
    });
  }

  createIngredient() {
    return this.formBuilder.group({
      ingredientName: '',
      quantity: ''
    });
  }

  addIngredient() {
    this.ingredients = this.form.get('ingredients') as FormArray;
    this.ingredients.push(this.createIngredient());
  }

  onSaveRecipe() {
    if (this.form.invalid) {
      return;
    }
    this.recipe = {
      recipeName: this.form.value.recipeName,
      style: this.form.value.style,
      ingredients: this.form.value.ingredients,
      servings: this.form.value.servings,
      cookingTime: this.form.value.cookingTime,
      calories: this.form.value.calories
    }
    console.log(this.recipe);
  }
}
