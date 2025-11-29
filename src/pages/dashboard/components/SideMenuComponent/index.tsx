import { NavLink } from 'react-router-dom'

import {
    X,
    LogOut,
    type LucideIcon,
} from 'lucide-react'


import styles from './styles.module.css';

interface MenuItem {
    path: string;
    label: string;
    icon: LucideIcon;
    ariaLabel: string;
}

const MenuItemComponent = (props: MenuItem) => {

    const {
        path,
        label,
        icon: Icon,
        ariaLabel
    } = props;

    return (
        <li>
            <NavLink to={path} className={styles.menuLink}>
                {({isActive}) => (
                    <button className={`${ styles.itemMenu } ${ isActive ? styles.active : '' }`} aria-label={ariaLabel}>
                        { Icon && <Icon /> }
                        <p>
                            { label }
                        </p>
                    </button>
                )}
            </NavLink>
        </li>
    );
}

interface SideMenuComponentProps {
    menuItems: Array<MenuItem>;
    onCloseMenu: () => void,
}


export const SideMenuComponent = (props: SideMenuComponentProps) => {

    const { 
        menuItems,
        onCloseMenu,
    } = props;


    return (
        <aside className={styles.sideMenu}>
            <ul className={styles.menu}>
                <li className={styles.closeMenu}>
                    <button 
                        className={styles.menuButton} 
                        aria-label='Botão para fechar menu'
                        onClick={onCloseMenu}>
                            <X />
                    </button>
                </li>

                { menuItems.map((item, index) => <MenuItemComponent {...item} key={index} />) }
            </ul>

            <button className={styles.exitButton}>
                <LogOut />
                <p>Sair</p>
            </button>
        </aside>
    );

}
