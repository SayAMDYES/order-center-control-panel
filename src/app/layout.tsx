import './globals.css'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import TopNavigationBar from "@/app/component/TopNavigationBar";
import React from "react";

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'OrderCenterControlPanel',
    description: 'It is a control panel for order center.',
}

export default function RootLayout({children,}: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <div className={"top-navigation-bar"}>
            <TopNavigationBar/>
        </div>
        <div className={"app-container"}>
            {children}
        </div>
        </body>
        </html>
    )
}
