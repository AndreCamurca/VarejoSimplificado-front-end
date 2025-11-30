import { useCallback, useState } from 'react';
import { 
    Menu,
    User,
    Package,
    Home,
} from 'lucide-react'

import { SideMenuComponent } from './components/SideMenuComponent';
import styles from "./styles.module.css";



const menuItems = [
    { 
        path: '/dashboard',
        label: 'Dashboard',
        icon: Home,
        ariaLabel: 'Ir para Dashboard'
    },
    { 
        path: '/users', 
        label: 'Usuarios', 
        icon: User, 
        ariaLabel: 'Ir para Pagina de Usuarios' 
    },
    { 
        path: '/products', 
        label: 'Produtos', 
        icon: Package, 
        ariaLabel: 'Ir para Pagina de Usuarios'
    },
];



export const DashboardPage = () => {
    const [isShowMenu, setIsShowMenu] = useState(false);

    const handlerShowMenu = useCallback(() => {
        setIsShowMenu(() => true);
    }, []);

    const handlerHiddenMenu = useCallback(() => {
        setIsShowMenu(() => false);
    }, []);

    return (
        <div className={styles.dashboardContainer}>

            <header className={styles.header}>
                <button className={styles.menuButton} aria-label='Menu button' onClick={handlerShowMenu}>
                    <Menu />
                </button>

                <h2 className={styles.companyName}>
                    Mercadinho do Edinho
                </h2>

                <div></div>
            </header>

            <main className={styles.main}>
                <div className={`${ styles.menuContainer } ${ !isShowMenu ? styles.hiddenMenu : '' }`}>
                    <SideMenuComponent 
                        menuItems={menuItems}
                        onCloseMenu={handlerHiddenMenu} />
                </div>

                <div className={styles.mainContent}>
                    <p>Content</p>
                </div>
            </main>
        </div>
    );
}