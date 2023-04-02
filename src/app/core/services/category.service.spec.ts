import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Category, CategoryData } from '../models/category.model';

import { CategoryService } from './category.service';

describe('CategoryService', () => {
  let service: CategoryService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(CategoryService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getCategoryList should use GET method to return list of categories', () => {
    service.getCategoryList().subscribe();
    const testRequest = httpTestingController.expectOne('http://localhost:5000/category')
    expect(testRequest.request.method).toEqual("GET");
  })

  it('createCategory should use POST method', () => {
    let mockData: CategoryData = {category: "cakes"};
    service.createCategory(mockData).subscribe();
    const testRequest = httpTestingController.expectOne('http://localhost:5000/category/create')
    expect(testRequest.request.method).toEqual("POST");
  })

  it('getCategoryById should use GET method', () => {
    service.getCategoryById().subscribe();
    const testRequest = httpTestingController.expectOne('http://localhost:5000/category/:id')
    expect(testRequest.request.method).toEqual("GET");
  })
});
