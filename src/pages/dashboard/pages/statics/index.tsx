
import styles from './styles.module.css';

import { NotificationComponent } from '../../components/NotificationComponent';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

import { Bar } from "react-chartjs-2";


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


export const StaticsPage = () => {

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

    const barChartData = {
        labels,
        datasets: [
            {
                label: 'Numero de Vendas',
                data: labels.map(() => Math.floor(Math.random() * 1000)),
                backgroundColor: 'rgba(92, 150, 74, 1)',
            },
        ],
    };

    const options = {
        responsive: true,
    };


    return (
        <div className={ styles.staticsContainer }>
            <section className={ styles.chartSection }>
                <div className={styles.cards}>
                    <div className={ styles.cardContainer }>
                        <p className={styles.cardValue}>R$ 10.000,00</p>
                        <p className={styles.cardLegend}>Faturamento Anual</p>
                    </div>

                    <div className={ styles.cardContainer }>
                        <p className={styles.cardValue}>R$ 5.000,00</p>
                        <p className={styles.cardLegend}>Faturamento Mensal</p>
                    </div>

                    <div className={ styles.cardContainer }>
                        <p className={styles.cardValue}>100</p>
                        <p className={styles.cardLegend}>Numero de Usuários</p>
                    </div>

                    <div className={ styles.cardContainer }>
                        <p className={styles.cardValue}>10.000</p>
                        <p className={styles.cardLegend}>Numero de Produtos</p>
                    </div>
                </div>

                <div className={ styles.barchartContainer }>
                    <h3 className='chartTitle'>
                        Grafico de vendas:
                    </h3>

                    <Bar id='barchart' data={barChartData} options={options} />
                </div>
            </section>


            <section className={ styles.notificationSection }>
                <h3 className='chartTitle'>
                    Notificações:
                </h3>

                <NotificationComponent />
            </section>
        </div>
    )

}
