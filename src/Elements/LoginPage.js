import {Form, Input, Button, Checkbox, Col, Row, Steps, Divider} from 'antd';
import {getToken, getTokenAPI, getUserAPI, useUser} from "../api/baseAPI";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

const Step = Steps.Step

export default function LoginPage(props) {
    const navigate = useNavigate();
    const user = useUser()
    useEffect(()=>{
        if(user !== null){
            navigate('/')
        }
    }, [user])
    const onFinish = (values) => {
        getTokenAPI(values).then((data)=>{
            console.log(data)
            localStorage.setItem('JWT', data.data.access)
            localStorage.setItem('JWTRefresh', data.data['refresh'])
            navigate('/')
        }).catch((err)=>{
            console.log(err)
        })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (<>
        <Divider>Вход</Divider>
        <Row>
            <Col span={8} offset={1}>
                <Form
                    name="basic"
                    labelCol={{span: 8}}
                    wrapperCol={{span: 16}}
                    initialValues={{remember: true}}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Имя пользователя"
                        name="username"
                        rules={[{required: true, message: 'Please input your username!'}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Пароль"
                        name="password"
                        rules={[{required: true, message: 'Please input your password!'}]}
                    >
                        <Input.Password/>
                    </Form.Item>

                    <Form.Item wrapperCol={{offset: 8, span: 16}}>
                        <Button type="primary" htmlType="submit">
                            Войти
                        </Button>
                        <Divider type={'vertical'}/>
                        <Button onClick={()=>{
                            window.location = 'https://oauth.vk.com/authorize?client_id=8107100&display=popup&response_type=code&scope=12&redirect_uri=http://localhost:3000/vk&v=5.131'
                        }}>
                            Войти через VK
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
            <Col offset={2} span={11}>
                <Steps current={1}>
                    <Step title="Завершено" description="Запустить фронтенд" />
                    <Step title="В процессе" subTitle="Войти на сайт" description="login: artur1214; password: wasd123;" />
                    <Step title="Попробовать сайт на вкус" description="создать/удалить/отредактировать запись о препарате" />
                </Steps>,
            </Col>
        </Row>
        </>
    );
}