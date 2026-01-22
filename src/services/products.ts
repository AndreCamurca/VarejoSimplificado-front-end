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

export async function addProductCategory(data: { name: string; description: string }) {
    const response = await api.post('/products/categories', data);
    return response.data;
}

export async function updateProductCategory(id: number, data: { name: string; description: string }) {
    const response = await api.put(`/products/categories/${id}`, data);
    return response.data;
}

export async function getProductCategoriesById(id: number): Promise<ProductCategoryType> {
    const response = await api.get(`/products/categories/${id}`);
    return response.data;
}

export async function deleteProductCategory(id: number) {
    const response = await api.delete(`/products/categories/${id}`);
    return response.data;
}

export interface ProductType {
    id: number;
    description: string;
    bar_code: string;
    quantity: number;
    price: number;
    category_id: number;
    business_id: number;
}

export async function getProductsAll(): Promise<Array<ProductType>> {
    const response = await api.get('/products');
    return response.data;
}
