import api from './api';


export interface ProductCategoryType {
    id: number;   
    name: string;
    description: string;
}


export async function getProductCategories(): Promise<Array<ProductCategoryType>> {
    const response = await api.get('/products/categories');
    return response.data;
}

export async function deleteProductCategory(id: number) {
    const response = await api.delete(`/products/categories/${id}`);
    return response.data;
}

