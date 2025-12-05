import { ButtonComponent } from '../../../../components/ButtonComponent'

import styles from './styles.module.css';


export const NotificationComponent = () => {

    return (
        <>
            <div className={styles.mobileNotification}>
                <div className={styles.notification}>
                    <p className={styles.notificationTitle}>
                        Produto abaixo do estoque
                    </p>
                    
                    <p className={styles.notificationDescription}>
                        O produto com id: xxxxxxxx, esta abaixo do estoque
                    </p>

                    <p className={styles.notificationDate}>
                        Data: 20/11/2025
                    </p>
                    
                    <ButtonComponent
                        type='button' 
                        text='Visualizar' />
                </div>
            </div>

            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Titulo</th>
                        <th>Description</th>
                        <th>Data</th>
                        <th>Ações</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>Produto abaixo do estoque</td>
                        <td>O produto com id: xxxxxxxx, esta abaixo do estoque</td>
                        <td>20/11/2025</td>
                        <td>Visualizar</td>
                    </tr>

                    <tr>
                        <td>Produto abaixo do estoque</td>
                        <td>O produto com id: xxxxxxxx, esta abaixo do estoque</td>
                        <td>20/11/2025</td>
                        <td>Visualizar</td>
                    </tr>
                </tbody>
            </table>
        </>
    )

}
