import {useEffect, useState} from "react";
import {useNavigate, useOutletContext} from "react-router-dom";
import {useAccount} from "../App";


export default function MainPage(props){
    const navigate = useNavigate()
    const [user] = useOutletContext()
    useEffect(()=>{
        navigate('/medicine')
    }, [])
    return ''
}