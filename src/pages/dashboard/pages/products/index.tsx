import Axios from "axios";

import { useCallback, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

import { TableComponent } from "../../../../components/TableComponent";
import { deleteProductsById, getProductsAll, type ProductType } from "../../../../services/products";

import styles from "./styles.module.css";
import { Plus } from "lucide-react";


const headers = [
  { column: 'id', label: 'ID produto' },
  { column: 'description', label: 'Descrição' },
  { column: 'quantity', label: 'Quantidade' },
  { column: 'bar_code', label: 'Codigo de barras' },
];

export const ProductsPage = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<Array<any>>([]);


  const getProducts = useCallback(async () => {
    try {
      setIsLoading(true);

      const response = await getProductsAll();
      setProducts(response);
      
    }
    finally {
      setIsLoading(false);
    }
  }, []);

  const handlerDeleteProduct = useCallback(async (product: ProductType) => {
    try {
      await deleteProductsById(product.id);
      getProducts();
      toast.success('Produto deletado com sucesso!');
    } catch (error) {
      let message = 'Não foi possível deletar o produto.';

      if (Axios.isAxiosError(error))
        message = error.response?.data.message;

      toast.error(message);
    }
  }, []);

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.headerTable}>
        <h2 className={styles.title}>Produtos</h2>

        <NavLink to='/dashboard/products/add' className='addButton'>
            <Plus size={24} />
            <p>Adicionar Novo Produto</p>
        </NavLink>
      </div>

      <TableComponent 
        isLoadding={isLoading} 
        header={headers}
        productsCategories={products}
        handlerClickEdit={() => {}}
        handlerClickDelete={handlerDeleteProduct} />
    </div>
  );
};
