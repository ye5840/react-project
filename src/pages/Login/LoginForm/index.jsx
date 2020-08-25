import React, { Component ,useState} from "react";
import { Form, Input, Button, Checkbox, Row, Col, Tabs, message } from "antd";
import {
  UserOutlined,
  LockOutlined,
  MobileOutlined,
  MailOutlined,
  GithubOutlined,
  WechatOutlined,
  QqOutlined,
} from "@ant-design/icons";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { login } from "@redux/actions/login";

import {reqGetVerifyCode} from '@api/acl/oauth'

import "./index.less";

const { TabPane } = Tabs;

const validator = (rule,value) => {
  return new Promise((resolve,reject) => {
    value = value && value.trim()
    if(!value){
      return reject('请输入密码')
    }
    if(value.length < 4){
      return reject('密码不能小于4')
    }
    if(value.length > 16){
      return reject('密码不能超过16')
    }
    if(!/^[0-9A-Za-z_]+$/.test(value)){
      return reject('密码格式不对')
    }
    return resolve()
  })
}

function LoginForm(props){
  const [form] = Form.useForm()
  let [downCount,setDownCount] = useState(5) 
  let [isShowBtn,setIsShowBtn] = useState(true)
  const onFinish = ({ username, password }) => {
    props.login(username, password).then((token) => {
      // 登录成功
      // console.log("登陆成功~");
      // 持久存储token
      localStorage.setItem("user_token", token);
      props.history.replace("/");
    });
    // .catch(error => {
    //   notification.error({
    //     message: "登录失败",
    //     description: error
    //   });
    // });
  };
  const getCode = () => {
    form.validateFields(['phone']).then(async res => {
      await reqGetVerifyCode(res.phone)
      message.success('验证码获取成功')
      
      const timeid = setInterval(() => {
        setDownCount(--downCount)
        setIsShowBtn(false)
        if(downCount <= 0){
          clearInterval(timeid)
          setDownCount(5)
          setIsShowBtn(true)
        }
      },1000)
    })
  }
  
    return (
      <>
        <Form
          form={form}
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Tabs
            defaultActiveKey="user"
            tabBarStyle={{ display: "flex", justifyContent: "center" }}
          >
            <TabPane tab="账户密码登陆" key="user">
              <Form.Item name="username"
                rules={[
                  {
                    required:true,
                    message:'请输入账户'
                  },
                  {
                    max:16,
                    message:'长度不能超过16个字符',
                  },
                  {
                    min:4,
                    message:'长度不能少于4个字符'
                  },
                  {
                    pattern:/^[0-9A-Za-z_]+$/,
                    message:'请输入正确的用户名'
                  }
                ]}
              >
              
                <Input
                  prefix={<UserOutlined className="form-icon" />}
                  placeholder="用户名: admin"
                />
              </Form.Item>
              <Form.Item name="password"
                rules={[{validator}]}
              >
                <Input
                  prefix={<LockOutlined className="form-icon" />}
                  type="password"
                  placeholder="密码: 111111"
                />
              </Form.Item>
            </TabPane>
            <TabPane tab="手机号登陆" key="phone">
              <Form.Item name="phone"
                rules={[
                  {
                    required:true,
                    message:'请输入手机号'
                  },
                  {
                    pattern:/^1[\d]{10}$/,
                    message:'请输入正确的手机号'
                  }
                ]}
              >
                <Input
                  prefix={<MobileOutlined className="form-icon" />}
                  placeholder="手机号"
                />
              </Form.Item>

              <Row justify="space-between">
                <Col span={16}>
                  <Form.Item name="verify">
                    <Input
                      prefix={<MailOutlined className="form-icon" />}
                      placeholder="验证码"
                    />
                  </Form.Item>
                </Col>
                <Col span={7}>
                  <Button className="verify-btn" 
                  onClick={getCode} 
                  disabled={isShowBtn?false:true}>
                    {isShowBtn?'获取验证码':`${downCount}秒后发送`}
                  </Button>
                </Col>
              </Row>
            </TabPane>
          </Tabs>
          <Row justify="space-between">
            <Col span={7}>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>自动登陆</Checkbox>
              </Form.Item>
            </Col>
            <Col span={5}>
              <Button type="link">忘记密码</Button>
            </Col>
          </Row>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              登陆
            </Button>
          </Form.Item>
          <Form.Item>
            <Row justify="space-between">
              <Col span={16}>
                <span>
                  其他登陆方式
                  <GithubOutlined className="login-icon" />
                  <WechatOutlined className="login-icon" />
                  <QqOutlined className="login-icon" />
                </span>
              </Col>
              <Col span={3}>
                <Button type="link">注册</Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </>
    );
  
}

export default withRouter(connect(null,{login})(LoginForm));
