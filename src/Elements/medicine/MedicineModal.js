import {Button} from "antd";
import Modal from "antd/es/modal/Modal";
import {MedicineForm} from "./MedicineForm";
import {useForm} from "antd/es/form/Form";
import {useEffect} from "react";


export function     MedicineModal(props){
    //const [form] = useForm()
    useEffect(()=>{
        if(!props.form.getFieldValue('id')){
            props.form.resetFields()
        }
    }, [props.visible])
    return(
        <>
            <Modal {...props} title="Добавить препарат" footer={<Button htmlType="submit" type={'primary'} onClick={()=>{
                props.form.submit()
            }}>Сохранить</Button>}>
                <MedicineForm {...props} saved={
                    props.onSave
                } form={props.form}/>
            </Modal>
        </>
    )
}