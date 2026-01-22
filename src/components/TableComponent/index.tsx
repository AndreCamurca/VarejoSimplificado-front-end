
import { BrushCleaning, SquarePen, Trash2 } from 'lucide-react';
import styles from './styles.module.css'

interface TableComponentProps {
    header: Array<{
        label: string;
        className?: string;
    }>

    productsCategories: Array<{
        id: number;
        name: string;
        description: string;
    }>

    isLoadding: boolean;

    handlerClickEdit: (category: any) => void;
    handlerClickDelete: (category: any) => void;
}

export const TableComponent = (props: TableComponentProps) => {

    const { 
        header, 
        isLoadding, 
        productsCategories,
        handlerClickEdit,
        handlerClickDelete
    } = props;

    return (
        <table className={ styles.table } cellSpacing={5}>
            <thead>
                <tr>
                    { header.map((col, index) => (<th key={index} className={col.className}>{col.label}</th>)) }
                    <th className={styles.actionColumn}>Ações</th>
                </tr>
            </thead>
        
            <tbody>
                { 
                    isLoadding && Array.from({ length: 10 }).map((_, index) => (
                        <tr key={index}>
                            {
                                header.map((_, colIndex) => (
                                    <td key={colIndex} className={ `${styles.skeletonCell} skeleton-loadding` }></td>
                                ))
                            }
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
                                <button 
                                    className={ `${ styles.editButton } ${ styles.buttonAction }` }
                                    onClick={() => handlerClickEdit(category)}>
                                        <SquarePen size={18} />
                                </button>

                                <button 
                                    className={ `${ styles.deleteButton } ${ styles.buttonAction }` } 
                                    onClick={() => handlerClickDelete(category)}>
                                        <Trash2 size={18} />
                                </button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    );
}
