import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { APIResponse } from 'src/app/core/models/apiResponse.model';
import { Category, CategoryData } from 'src/app/core/models/category.model';
import { CategoryService } from 'src/app/core/services/category.service';

@Component({
  selector: 'ecom-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent {
  categoryForm: FormGroup = this.formBuilder.group({
    category: ['', [Validators.required]]
  });

  constructor(private formBuilder: FormBuilder, private categoryService: CategoryService, private router: Router) { }

  saveCategory() {
    if (this.categoryForm.invalid) {
      this.categoryForm.markAllAsTouched();
      return;
    }

    let categoryData = new CategoryData();
    categoryData.category = this.categoryForm.get('category')?.value;

    this.categoryService.createCategory(categoryData).subscribe((res: APIResponse<Category>) => {
      if (res.status == "SUCCESS") {
        this.router.navigateByUrl('category');
      }
    }
    )

  }

}
