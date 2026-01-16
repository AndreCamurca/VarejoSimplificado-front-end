
import { useState, useEffect, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { Plus, SquarePen, Trash2, BrushCleaning } from 'lucide-react';

import { 
    getProductCategories, 
    deleteProductCategory,
    type ProductCategoryType 
} from '../../../../../services/products';


import styles from './styles.module.css'



export const ProductsCategoriesPage = () => {

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

    const handlerClickDelete = useCallback(async (categoryId: number) => {
        await deleteProductCategory(categoryId);
        handlerProductCategories();
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

                <NavLink to='/dashboard/categories/add' className={styles.addCategoryButton}>
                    <Plus size={24} />
                    <p>Adicionar Nova Categoria</p>
                </NavLink>
            </div>

            <table className={ styles.table } cellSpacing={5}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome da Categoria</th>
                        <th>Descrição</th>
                        <th className={styles.actionColumn}>Ações</th>
                    </tr>
                </thead>
            
                <tbody>
                    { 
                        isLoadding && Array.from({ length: 10 }).map((_, index) => (
                            <tr key={index}>
                                <td className={ `${styles.skeletonCell} skeleton-loadding` }></td>
                                <td className={ `${styles.skeletonCell} skeleton-loadding` }></td>
                                <td className={ `${styles.skeletonCell} skeleton-loadding` }></td>
                                <td className={ `${styles.skeletonCell} skeleton-loadding` }></td>
                            </tr>
                        ))
                    }

                    {
                        !isLoadding && productsCategories.length === 0 && (
                            <tr>
                                <td colSpan={4} className={ styles.noDataCell }>
                                    <BrushCleaning size={48} />
                                    <br />
                                    Nenhuma categoria de produto encontrada.
                                </td>
                            </tr>
                        )
                    }

                    {
                        !isLoadding && productsCategories.map((category) => (
                            <tr key={ category.id }>
                                <td>{ category.id }</td>
                                <td>{ category.name }</td>
                                <td>{ category.description }</td>
                                <td>
                                    <button className={ `${ styles.editButton } ${ styles.buttonAction }` }>
                                        <SquarePen size={18} />
                                    </button>

                                    <button 
                                        className={ `${ styles.deleteButton } ${ styles.buttonAction }` } 
                                        onClick={() => handlerClickDelete(category.id)}>
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );

}
