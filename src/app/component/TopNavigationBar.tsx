'use client';

import './TopNavigationBar.css';
import {useRouter} from "next/navigation";
import {Avatar, Button} from "antd";

export default function TopNavigationBar() {
    const router = useRouter()
    return (
        <div className={"top-navi-bar flex"}>
            <div className={"flex justify-center top-navi-bar-img-space"}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className={"object-contain scale-50"}
                     src="/next.svg"
                     alt="Back to home"
                     onClick={() => {
                         router.push('/')
                     }}
                />
            </div>
            <div className={"top-navi-bar-white-space"}></div>
            <div className={"top-navi-bar-button-space flex items-center"}>
                <Button type="link"
                        className={"top-navi-bar-button"}>
                    Ready To Process
                </Button>
                <Button type="link"
                        className={"top-navi-bar-button"}>
                    Recent Alerts
                </Button>
                <Button type="link"
                        className={"top-navi-bar-button"}>
                    Notification
                </Button>
                <Button type="link"
                        className={"top-navi-bar-button"}>
                    Console
                </Button>
            </div>
            <div className={"top-navi-bar-user-space flex"}>
                <div className={"top-navi-bar-user-space-avatar flex justify-center items-center"}>
                    <Avatar shape={"square"}
                            src={"/avatar.png"}/>
                </div>
                <div
                    className={"top-navi-bar-user-space-name font-light flex justify-start items-center overflow-hidden whitespace-nowrap overflow-ellipsis"}>
                    Quasar
                </div>
                <div className={"top-navi-bar-user-space-logout text-base flex justify-center items-center pl-3"}>
                    <Button type="link"
                            className={"font-bold text-blue-700"}>
                        Logout
                    </Button>
                </div>
            </div>
        </div>
    )
}