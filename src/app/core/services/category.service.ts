import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Environment } from 'src/environments/environment';
import { APIResponse } from '../models/apiResponse.model';
import { Category, CategoryData } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) {}

  getCategoryList(): Observable<APIResponse<Category[]>> {
    return this.http.get( Environment.url + '/category') as Observable<APIResponse<Category[]>>;
  }

  getCategoryById(): Observable<APIResponse<Category>> {
    return this.http.get( Environment.url + '/category/:id') as Observable<APIResponse<Category>>;
  }

  createCategory(payload: CategoryData): Observable<APIResponse<Category>> {
    return this.http.post( Environment.url + '/category/create', payload) as Observable<APIResponse<Category>>;
  }
}
