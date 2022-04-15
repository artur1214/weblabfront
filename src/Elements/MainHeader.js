import {Button, Descriptions, PageHeader} from "antd";
import {Outlet} from "react-router-dom";
import {dropJWT} from "../api/baseAPI";
import {createContext, useEffect} from "react";

export const MedicineCreateContext = createContext(false)

export const setMedicineCreate = (val) => {
    return (<MedicineCreateContext.Provider value={val}/>)
}


export default function MainHeader(props){
    const user = props.user ? props.user : {}
    useEffect(()=>{
        console.log(props)
    }, [user])
    const addMedicine = () => {

    }

    return (<>
        <div className="site-page-header-ghost-wrapper">
            <PageHeader
                ghost={false}
                onBack={() => window.history.back()}
                title="Медицинские препараты"
                subTitle="Список"
                extra={[
                    user.id ? <Button key="1" type="primary" onClick={()=>{
                        dropJWT()
                        window.location.reload();
                    }}>
                        Выход
                    </Button>: null
                ]}
            >
                <Descriptions size="small" column={3}>
                    <Descriptions.Item label="Пользователь">{user.username}</Descriptions.Item>
                    <Descriptions.Item label="Email">
                        <a href={'mailto:' + user.email}>{user.email}</a>
                    </Descriptions.Item>

                </Descriptions>
            </PageHeader>
        </div>
        </>)
}