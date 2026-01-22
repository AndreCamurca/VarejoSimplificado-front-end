import * as yup from 'yup';

import { ButtonComponent } from "../../../../../components/ButtonComponent";
import { ButtonGoBack } from "../../../../../components/ButtonGoBack"
import { TextInputComponent } from "../../../../../components/TextInputComponent";

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import styles from './styles.module.css';
import { useCallback, useState } from 'react';
import { addProductCategory } from '../../../../../services/products';
import { useNavigate } from 'react-router-dom';


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
    const [isLoadding, setIsLoadding] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(registerCategorySchema)
    });


    const onSubmit = useCallback(async (form: RegisterCategoryFormType) => {
        setIsLoadding(true);

        try {
            await addProductCategory({
                name: form.title,
                description: form.description
            });

            toast.success('Categoria adicionada com sucesso!');
            navigate('/dashboard/categories');
        } catch {
            toast.error('Erro ao adicionar categoria. Tente novamente.');
        } finally {
            setIsLoadding(false);
        }
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
                        isError={!!errors.title}
                        errorMessage={errors.title?.message}
                        register={register('title')} />

                    <TextInputComponent
                        id='category-description'
                        type='text'
                        label='Descrição da Categoria'
                        placeholder='Digite a descrição da categoria'
                        isError={!!errors.description}
                        errorMessage={errors.description?.message}
                        register={register('description')} />
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


