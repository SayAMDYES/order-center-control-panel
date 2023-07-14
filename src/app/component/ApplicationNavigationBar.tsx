'use client';
import './ApplicationNavigationBar.scss';
import React, {useState} from 'react';
import {
    PieChartOutlined,
    ShoppingCartOutlined,
    ShoppingOutlined
} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import {Menu} from 'antd';
import {useRouter} from "next/navigation";

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('Dashboard', '/dashboard', <PieChartOutlined/>, [
        getItem('Overview', '/dashboard/overview'),
    ]),
    getItem('Order', '/order', <ShoppingCartOutlined/>, [
        getItem('Express Order', '/order/express'),
        getItem('City Delivery Order', '/order/city-delivery'),
    ]),
    getItem('Commodity', 'commodity', <ShoppingOutlined/>, [
        getItem('Query Commodity', '/commodity/query'),
        getItem('New Commodity', '/commodity/add-new'),
    ]),
];

const rootSubmenuKeys = ['dashboard', 'order', 'commodity'];


const App: React.FC = () => {
    const router = useRouter();

    const [openKeys, setOpenKeys] = useState(['dashboard']);

    const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };

    const clickHandler = (e: MenuItem) => {
        if (e && e.key) {
            router.push(e.key.toString());
        }
    }

    return (
        <Menu
            mode="inline"
            openKeys={openKeys}
            onOpenChange={onOpenChange}
            items={items}
            className={"app-navi-menu"}
            onClick={clickHandler}
        />
    );
};

export default App;