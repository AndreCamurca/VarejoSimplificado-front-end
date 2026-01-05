import api from './api';

export async function getProductCategories() {
    const response = await api.get('/product/categories');
    console.log(response.data);
    return response.data;
}

