import {Form, Input, Select} from "antd";
import {useEffect, useState} from "react";
import {MedicineAPI} from "../../api/medicineAPI";
import {Option} from "antd/es/mentions";


export function MedicineForm(props){

    const [types, setTypes] = useState([])
    useEffect(()=>{

        console.log(props)
        new MedicineAPI().getTypes().then((res)=>{
            console.log(res.data)
            setTypes(res.data)
            //  options = types.map((el) => {
            //     console.log(el)
            //     return <Option value={el[0]}>{el[1]}</Option>
            // })
        }).catch((err)=>{
            console.log(err)
        })
    }, [])

    var options = types.map((el) => {
        return <Select.Option value={el[0]}>{el[1]}</Select.Option>
    })


    return <>
        <Form layout="vertical" form={props.form} onFinish={props.saved}>
            <Form.Item hidden={true} name={'id'}>
                <Input />
            </Form.Item>
            <Form.Item label={'Тип'} name={'type'}>
                <Select>{options}</Select>
            </Form.Item>
            <Form.Item label={'Название'} name={'name'}>
                <Input />
            </Form.Item>
            <Form.Item label={'Производитель'} name={'model'}>
                <Input />
            </Form.Item>
            <Form.Item label={'Цена'} name={'price'}>
                <Input type={'number'}/>
            </Form.Item>
        </Form>
    </>
}