import {useLocation, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {getVkToken} from "../../api/baseAPI";


export default function VKAuthPage(){
    const search = useLocation().search;
    const navigate = useNavigate();
    useEffect(()=>{
        console.log(search);
        getVkToken(search).then((res)=>{
            console.log(res.data)
            if (res.status === 200 && ('access' in res.data)){
                localStorage.setItem('JWT', res.data.access)
                localStorage.setItem('JWTRefresh', res.data['refresh'])

            }
            setTimeout(()=>{
                navigate('/')
            }, 1000)

        }).catch((err)=>{
            console.log(err)
        })
    }, [])
    return <>
    </>
}