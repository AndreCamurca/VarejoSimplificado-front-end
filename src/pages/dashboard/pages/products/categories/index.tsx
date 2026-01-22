
import { useState, useEffect, useCallback } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';

import Axios from 'axios';

import { 
    getProductCategories, 
    deleteProductCategory,
    type ProductCategoryType 
} from '../../../../../services/products';


import styles from './styles.module.css'
import { TableComponent } from '../../../../../components/TableComponent';
import { toast } from 'react-toastify';


const header = [
    { column: 'id',  label: 'ID' },
    { column: 'name',  label: 'Nome' },
    { column: 'description',  label: 'Descrição' },
];


export const ProductsCategoriesPage = () => {
    const navigator = useNavigate();

    const [isLoadding, setIsLoadding] = useState(true);
    const [productsCategories, setProductsCategories] = useState<Array<ProductCategoryType>>([]);

    const handlerProductCategories = async () => {
        setIsLoadding(true);

        try {
            const response = await getProductCategories();
            setProductsCategories(response);
        }
        catch {
            console.log('Erro ao buscar categorias de produtos');
        }
        finally {
            setIsLoadding(false);
        }
    }

    const handlerClickEdit = useCallback((category: ProductCategoryType) => {
        navigator('/dashboard/categories/add?id=' + category.id);
    }, []);

    const handlerClickDelete = useCallback(async (category: ProductCategoryType) => {
        try {
            const response = await deleteProductCategory(category.id);
            toast.success(response.detail);
        } 
        catch (err) {
            let message = 'Erro ao deletar a categoria de produto.';

            if (Axios.isAxiosError(err))
                message = err.response?.data?.detail;

            toast.error(message);
        }
        finally {
            handlerProductCategories();
        }
    }, []);

    useEffect(() => {
        handlerProductCategories();
    }, []);


    return (
        <div className={ styles.productsCategoriesContainer }>

            <div className={ styles.categoriesHeader }>
                <h2 className='chartTitle'>
                    Categorias de Produtos
                </h2>

                <NavLink to='/dashboard/categories/add' className='addButton'>
                    <Plus size={24} />
                    <p>Adicionar Nova Categoria</p>
                </NavLink>
            </div>

            <TableComponent 
                header={header} 
                isLoadding={isLoadding} 
                productsCategories={productsCategories} 
                handlerClickEdit={handlerClickEdit} 
                handlerClickDelete={handlerClickDelete} />
        </div>
    );

}
