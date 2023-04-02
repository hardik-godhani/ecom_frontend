import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Category } from 'src/app/core/models/category.model';
import { CategoryService } from 'src/app/core/services/category.service';

import { CategoryComponent } from './category.component';

 describe('CategoryComponent', () => {
  let component: CategoryComponent;
  let fixture: ComponentFixture<CategoryComponent>;
  let categoryService: CategoryService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [CategoryComponent],
      providers: [
        CategoryService,
        { provide: Router, useValue: {navigateByUrl: jasmine.createSpy("navigateByUrl")} }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CategoryComponent);
    component = fixture.componentInstance;
    categoryService = TestBed.inject(CategoryService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check positive response', () => {
    const mockCategory: Category[] = [{ id: 1, category: "cakes" }];
    spyOn(categoryService, "getCategoryList").and.returnValue(of({ status: "SUCCESS", data: mockCategory, message: "" }));
    component.listCategory();
    expect(component.categories).toEqual(mockCategory);
    expect(categoryService.getCategoryList).toHaveBeenCalled();
  })

  it("should call category detail page", () => {
    const mockCategory: Category = { id: 1, category: "cakes"};
    component.onCategoryDetail(mockCategory);
    expect(router.navigateByUrl).toHaveBeenCalledWith("/category/" + mockCategory.id);
  })
});
