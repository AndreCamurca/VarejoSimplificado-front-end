import { useCallback, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { 
    Menu,
    User,
    PackageSearch,
    Package,
    Home,
} from 'lucide-react'

import { SideMenuComponent } from './components/SideMenuComponent';

import styles from "./styles.module.css";
import { useAuthStore } from '../../states/auth';



const menuItems = [
    { 
        path: '/dashboard/',
        label: 'Dashboard',
        icon: Home,
        ariaLabel: 'Ir para Dashboard',
        isAdminOnly: false
    },
    { 
        path: '/dashboard/categories',
        label: 'Categorias',
        icon: PackageSearch,
        ariaLabel: 'Ir para Categorias',
        isAdminOnly: true
    },
    { 
        path: '/dashboard/users', 
        label: 'Usuarios', 
        icon: User, 
        ariaLabel: 'Ir para Pagina de Usuarios',
        isAdminOnly: true,
    },
    { 
        path: '/dashboard/products', 
        label: 'Produtos', 
        icon: Package, 
        ariaLabel: 'Ir para Pagina de Usuarios',
        isAdminOnly: false,
    },
];



export const DashboardPage = () => {
    const navigate = useNavigate();
    const [isShowMenu, setIsShowMenu] = useState(false);

    const isAdminUser = useAuthStore((state) => state.isAdminUser());
    const logoutUser = useAuthStore((state) => state.logoutUser);


    const handlerShowMenu = useCallback(() => {
        setIsShowMenu(() => true);
    }, []);

    const handlerHiddenMenu = useCallback(() => {
        setIsShowMenu(() => false);
    }, []);

    const handlerExitMenu = useCallback(() => {
        logoutUser();
        navigate('/login');
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
                        isAdminUser={isAdminUser}
                        onCloseMenu={handlerHiddenMenu}
                        onExitMenu={handlerExitMenu} />
                </div>

                <div className={styles.mainContent}>
                    <Outlet />
                </div>
            </main>
        </div>
    );
}