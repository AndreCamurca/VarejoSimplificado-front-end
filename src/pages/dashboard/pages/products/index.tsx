import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import { TableComponent } from "../../../../components/TableComponent";
import { getProductsAll } from "../../../../services/products";


const headers = [
  { column: 'id', label: 'ID produto' },
  { column: 'description', label: 'Descrição' },
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


  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Produtos</h2>

      <TableComponent 
        isLoadding={isLoading} 
        header={headers}
        productsCategories={products}
        handlerClickEdit={() => {}}
        handlerClickDelete={() => {}} />
    </div>
  );
};
