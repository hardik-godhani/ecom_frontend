export class CategoryData {
   category: string = '';
}

export interface Category {
  id: number;
  category: string;
  isDeleted?: boolean;
  createdAt?: string;
  createdBy?: number;
  updatedAt?: string;
  updatedBy?: number;
}