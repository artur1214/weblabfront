import {Outlet, useNavigate, useOutletContext} from "react-router-dom";
import {Button, Descriptions, Divider, PageHeader} from "antd";
import MainHeader from "./Elements/MainHeader";
import {useContext, useEffect, useReducer, useState} from "react";
import {getToken, getUserAPI, useUser} from "./api/baseAPI";


export function useAccount() {
    return useOutletContext();
}

export default function App() {
    const navigate = useNavigate();
    //const user = useUser()
    const [user, setUser] = useState(null)
    const [update, setUpdate] = useState(false)
    useEffect(()=>{
        if (update) {
            console.log('no update')
            return;
        }
        if (getToken()) {
            getUserAPI().then((res) => {
                setUser(res.data)
                console.log(res.data)
                setUpdate(s=>!s)
            }).catch((err) => {
                console.log(err)
                    //window.location.reload();
            })
        } else {
            let current_href = window.location.href.split('/').filter(el=>el)
            console.log(current_href)
            if(!(current_href[current_href.length -1].startsWith('vk?') || (current_href[current_href.length -1].startsWith('vk#'))))
                navigate('/login')
        }


    }, [update])

    return (<>
        <MainHeader user={user}/>
        <Outlet updateUser={setUpdate} context={[user, setUpdate]}/>
    </>);
}