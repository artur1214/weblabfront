import {useOutletContext} from "react-router-dom";
import {useEffect, useState} from "react";
import {Col, Table, Row, Button, Divider, message} from "antd";
import {MedicineAPI} from "../../api/medicineAPI";
import {useForm} from "antd/es/form/Form";
import {MedicineModal} from "./MedicineModal";
import {logDOM} from "@testing-library/react";


export default function MedicineTable(props) {
    var changeId
    const removeElement = (id) => {
        new MedicineAPI().remove(id).then((res) => {
            console.log(res)
            setUpdate(x => !x)
        }).catch((err) => {
            console.log(err)
        })
    }
    const [form] = useForm()
    const [user, updateUser] = useOutletContext()
    const [drugs, setDrugs] = useState([])
    const [types, setTypes] = useState([])
    const [update, setUpdate] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const columns = [
        {
            title: 'Тип',
            dataIndex: 'type',
            render: (val, row) => {
                return types.filter(e => {
                    return e[0] === val
                }).map(e => e[1])[0]
            }
        },
        {
            title: 'Название',
            dataIndex: 'name'
        },
        {
            title: 'Производитель',
            dataIndex: 'model'
        },
        {
            title: 'Цена',
            dataIndex: 'price',
            render: (val, row) => {
                return val + ' Р.'
            }
        },
        {
            title: () => {
                return <>Действие
                    <Divider type={'vertical'}/>
                    <Button type={'primary'}
                            onClick={() => {
                                form.resetFields()
                                setModalVisible(true)
                            }}
                    >

                        Добавить</Button></>
            },
            dataIndex: 'id',
            render: (val, row) => {
                return <>
                    <a onClick={() => {
                        form.setFieldsValue({...row})
                        //changeId = val
                        setModalVisible(true)
                    }}>
                        Изменить
                    </a><Divider type={'vertical'}/>
                    <a onClick={() => {
                        removeElement(val)
                    }}>
                        Удалить
                    </a>
                </>

            }
        }
    ]

    useEffect(() => {
        //console.log(updateUser)
        updateUser(x=>!x)
        //console.log(user)
        new MedicineAPI().getMedicine().then((res) => {
            setDrugs(res.data)
        }).catch((err) => {
            console.log(err)
        })
        new MedicineAPI().getTypes().then((res) => {
            setTypes(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }, [update])
    return <>
        <Divider>Таблица препаратов</Divider>
        <Row>
            <Col span={20} offset={2}>
                <Table columns={columns} dataSource={drugs}/>
            </Col>
        </Row>

        <MedicineModal onCancel={() => {
            setModalVisible(false)
        }} onSave={(data) => {
            if (data.id) {
                new MedicineAPI().patch(data.id, (({id, ...o}) => o)(data)).then((res) => {
                    setModalVisible(false)
                    message.success('Запись успешно изменена')
                    setUpdate(x => !x)
                }).catch((err) => {
                    for (let el in err.response.data) {
                        form.setFields([{
                            name: el,
                            errors: err.response.data[el]
                        }])
                    }
                })

            } else {
                new MedicineAPI().create(data).then((res) => {
                    console.log(res)
                    setModalVisible(false)
                    message.success('Новая запись успешно добавлена')
                    setUpdate(x => !x)
                }).catch((err) => {
                    console.log(err.response.data)
                    for (let el in err.response.data) {
                        form.setFields([{
                            name: el,
                            errors: err.response.data[el]
                        }])
                    }

                })
            }
        }} visible={modalVisible} form={form}/>
    </>
}