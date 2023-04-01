import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Category, CategoryData } from 'src/app/core/models/category.model';
import { CategoryService } from 'src/app/core/services/category.service';

import { CategoryFormComponent } from './category-form.component';

describe('CategoryFormComponent', () => {
  let component: CategoryFormComponent;
  let fixture: ComponentFixture<CategoryFormComponent>;
  let categoryService: CategoryService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatCardModule, MatInputModule, FormsModule, ReactiveFormsModule, BrowserAnimationsModule, HttpClientModule],
      declarations: [CategoryFormComponent],
      providers: [
        CategoryService,
        { provide: Router, useValue: {navigateByUrl: jasmine.createSpy("navigateByUrl")} }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryFormComponent);
    component = fixture.componentInstance;
    categoryService = TestBed.inject(CategoryService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should create category form with default values', () => {
    expect(component.categoryForm.get("category")?.value).toBe("");
  });

  it('should mark the form as touched and not call categoryService.createCategory when form is invalid', () => {
    spyOn(categoryService, "createCategory").and.callThrough();
    const mockData = new CategoryData();
    mockData.category = "";

    component.categoryForm.setValue(mockData);

    const categorySaveButton = fixture.nativeElement.querySelector('button[id="categoryFormSubmit"]');
    categorySaveButton.click();
    expect(component.categoryForm.touched).toBeTruthy();
    expect(categoryService.createCategory).not.toHaveBeenCalled();
  });

  it('should check positive response', () => {
    const mockCategory: Category = { id: 1, category: "pizza" };
    spyOn(categoryService, "createCategory").and.returnValue(of({status: "SUCCESS", data: mockCategory, message:""}));
    const mockData = new CategoryData();
    mockData.category = "pizza";

    component.categoryForm.setValue(mockData);

    const categorySaveButton = fixture.nativeElement.querySelector('button[id="categoryFormSubmit"]');
    categorySaveButton.click();
    expect(categoryService.createCategory).toHaveBeenCalledWith(mockData);
    expect(router.navigateByUrl).toHaveBeenCalledWith("category");
  })
});
