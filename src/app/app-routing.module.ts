import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeBookComponent } from './recipe/recipe-book/recipe-book.component';
import { RecipeCreateComponent } from './recipe/recipe-create/recipe-create.component';

const routes: Routes = [
  {path: '', component: RecipeBookComponent},
  {path: 'create', component: RecipeCreateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
