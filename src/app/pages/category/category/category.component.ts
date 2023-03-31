import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { APIResponse } from 'src/app/core/models/apiResponse.model';
import { Category } from 'src/app/core/models/category.model';
import { CategoryService } from 'src/app/core/services/category.service';

@Component({
  selector: 'ecom-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {
  categories: Category[] = [];

  constructor( private categoryService: CategoryService, private router: Router) { 
    this.listCategory();
  }

  listCategory() {

    this.categoryService.getCategoryList().subscribe((res: APIResponse<Category[]>) => {
      if (res.status == "SUCCESS" && res.data) {
        this.categories = res.data;
      }
    }, (err) => {

    })

  }


}
