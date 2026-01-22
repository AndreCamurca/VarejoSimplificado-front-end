import * as yup from 'yup';
import Axios from 'axios';

import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';

import { ButtonComponent } from "../../../../../components/ButtonComponent";
import { ButtonGoBack } from "../../../../../components/ButtonGoBack"
import { TextInputComponent } from "../../../../../components/TextInputComponent";

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import styles from './styles.module.css';
import { 
    addProductCategory,
    getProductCategoriesById,
    updateProductCategory,
    type ProductCategoryType 
} from '../../../../../services/products';


const registerCategorySchema = yup.object({
    title: yup.string()
        .required('O título é obrigatório'),
    
    description: yup.string()
        .required('A descrição é obrigatória'),
});

interface RegisterCategoryFormType {
    title: string;
    description: string;
}


export const AddProductCategoryPage = () => {
    const navigate = useNavigate();
    const categoryId = new URLSearchParams(window.location.search).get('id');

    const [isLoadding, setIsLoadding] = useState(!!categoryId);

    const [productCategory, setProductCategory] = useState<ProductCategoryType>({
        name: '',
        description: '',
        id: 0
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(registerCategorySchema)
    });


    const handlerAddCategory = useCallback(async (form: RegisterCategoryFormType) => {
        await addProductCategory({
            name: form.title,
            description: form.description
        }); 

        toast.success('Categoria adicionada com sucesso!');
    }, []);

    const handlerUpdateCategory = useCallback(async (form: RegisterCategoryFormType) => {
        await updateProductCategory(Number(categoryId), {
            name: form.title,
            description: form.description
        }); 

        toast.success('Categoria atualizada com sucesso!');
    }, []);

    const onSubmit = useCallback(async (form: RegisterCategoryFormType) => {
        setIsLoadding(true);

        try {
            if (!categoryId) await handlerAddCategory(form);
            else await handlerUpdateCategory(form);

            navigate('/dashboard/categories');
        } catch (err) {
            let message = 'Erro ao adicionar categoria. Tente novamente.';

            if (Axios.isAxiosError(err))
                message = err.response?.data?.detail;

            toast.error(message);
        } finally {
            setIsLoadding(false);
        }
    }, []);

    const handlerGetCategoryById = useCallback(async () => {
        try {
            const response = await getProductCategoriesById(Number(categoryId));
            setProductCategory(response);
        }
        catch (err) {
            let message = 'Erro ao buscar a categoria de produto.';

            if (Axios.isAxiosError(err))
                message = err.response?.data?.detail;

            toast.error(message);
        }   finally {
            setIsLoadding(false);
        }
    }, []);

    useEffect(() => {
        if (!categoryId)
            return;

        handlerGetCategoryById();
    }, []);

    const handlerInput = useCallback((event: React.FormEvent<HTMLInputElement>, field: keyof ProductCategoryType) => {
        const input = event.target as HTMLInputElement;
        setProductCategory(prev => ({ ...prev, [field]: input.value } as ProductCategoryType));
    }, []);


    return (
        <div>
            <ButtonGoBack text="Voltar para a tela anterior" />

            <h2 className={`${styles.title} chartTitle`}>
                Adicionar Categoria de Produto
            </h2>

            <form className={styles.addCategoryForm} onSubmit={handleSubmit(onSubmit)}>
                <fieldset className={styles.formFieldset}>
                    <TextInputComponent
                        id='category-name'
                        type='text'
                        label='Titulo da Categoria'
                        placeholder='Digite o título da categoria'
                        value={productCategory.name}
                        isError={!!errors.title}
                        errorMessage={errors.title?.message}
                        register={register('title')}
                        onInput={(e) => handlerInput(e, 'name')} />

                    <TextInputComponent
                        id='category-description'
                        type='text'
                        label='Descrição da Categoria'
                        placeholder='Digite a descrição da categoria'
                        value={productCategory.description}
                        isError={!!errors.description}
                        errorMessage={errors.description?.message}
                        register={register('description')}
                        onInput={(e) => handlerInput(e, 'description')} />
                </fieldset>

                <ButtonComponent 
                    text='Salvar Categoria'
                    type='submit'
                    className={styles.buttonLogin}
                    isLoadding={isLoadding} />
            </form>
        </div>
    )
}


