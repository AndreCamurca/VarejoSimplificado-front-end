import { NavLink } from 'react-router-dom'
import { useCallback, useState } from 'react';

import { 
    Menu,
    X,
    User,
    Package,
    Home,
    LogOut,
} from 'lucide-react'

import styles from "../styles/dashboard.module.css";


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

                <h2 className={styles.companyName}>Ocara Center</h2>

                <div></div>
            </header>

            <main className={styles.main}>
                <div className={`${ styles.menuContainer } ${ !isShowMenu ? styles.hiddenMenu : '' }`}>
                    <aside className={styles.sideMenu}>
                        <ul className={styles.menu}>
                            <li className={styles.closeMenu}>
                                <button className={styles.menuButton} aria-label='Botão para fechar menu' onClick={handlerHiddenMenu}>
                                    <X />
                                </button>
                            </li>

                            <li>
                                <NavLink to='/dashboard' className={styles.menuLink}>
                                    {({isActive}) => (
                                        <button className={`${ styles.itemMenu } ${ isActive ? styles.active : '' }`} aria-label='Ir para Dashboard'>
                                            <Home />
                                            <p>Dashboard</p>
                                        </button>
                                    )}
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to='/users' className={styles.menuLink}>
                                    {({isActive}) => (
                                        <button className={`${ styles.itemMenu } ${ isActive ? styles.active : '' }`} aria-label='Ir para Pagina de Usuarios'>
                                            <User />
                                            <p>Usuarios</p>
                                        </button>
                                    )}
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to='/products' className={styles.menuLink}>
                                    {({isActive}) => (
                                        <button className={`${ styles.itemMenu } ${ isActive ? styles.active : '' }`} aria-label='Ir para Pagina de Usuarios'>
                                            <Package />
                                            <p>Produtos</p>
                                        </button>
                                    )}
                                </NavLink>
                            </li>
                        </ul>

                        <button className={styles.exitButton}>
                            <LogOut />
                            <p>Sair</p>
                        </button>
                    </aside>
                </div>

                <div className={styles.mainContent}>
                    <p>Content</p>
                </div>
            </main>
        </div>
    );
}