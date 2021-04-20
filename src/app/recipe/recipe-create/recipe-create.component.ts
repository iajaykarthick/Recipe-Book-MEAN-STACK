import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Recipe } from "../recipe.model";
import { RecipesService } from "../recipes.service";
import { mimeType } from './mime-type.validator';

@Component({
  selector: 'app-recipe-create',
  templateUrl: './recipe-create.component.html',
  styleUrls: ['./recipe-create.component.css']
})
export class RecipeCreateComponent implements OnInit {

  form: FormGroup;
  ingredients: FormArray;
  imagePreview: string;

  private recipe: Recipe;
  private recipeId: string = null;

  constructor(private formBuilder: FormBuilder, private recipesService: RecipesService) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({ // wrapping key inside single quote is optional
      'recipeName': new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      'style': new FormControl(null, {validators: [Validators.required]}),
      'ingredients': this.formBuilder.array([ this.createIngredient() ]),
      'servings': new FormControl(null, {validators: [Validators.required]}),
      'cookingTime': new FormControl(null, {validators: [Validators.required]}),
      'calories': new FormControl(null, {validators: [Validators.required]}),
      'image': new FormControl(null, {validators: [Validators.required], asyncValidators: [mimeType]})
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

  onImagePicked(event: Event){
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({
      image: file
    });
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
    console.log(file);
    console.log(this.form);
  }

  onSaveRecipe() {
    if (this.form.invalid) {
      return;
    }

    this.recipesService.addRecipe(this.recipeId,
      this.form.value.recipeName,
      this.form.value.style,
      this.form.value.ingredients,
      this.form.value.servings,
      this.form.value.cookingTime,
      this.form.value.calories,
      this.form.value.image);

    this.form.reset();
  }
}
