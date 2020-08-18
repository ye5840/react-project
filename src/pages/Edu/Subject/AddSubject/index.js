import React, { Component } from 'react'
import {Card,Form,Input,Select,Button, Divider,message} from 'antd'
import {ArrowLeftOutlined} from '@ant-design/icons'
import { Link } from 'react-router-dom'
import {reqGetSubject,reqAddSubject} from '@api/edu/subject'
const layout = {
  // antd把一个宽度分为24份
  // 表单文字描述部分
  labelCol: {
    span: 3
  },
  // 表单项部分
  wrapperCol: {
    span: 6
  }
}
export default class AddSubject extends Component {
  page = 1
  state = {
    total:0,
    items:[],
  }
  async componentDidMount() {
    const res =  await reqGetSubject(this.page++,10)
    this.setState(res)
  }
  
  handleGetSubject = async () => {
    const res =  await reqGetSubject(this.page++,10)
    const newItems = [...this.state.items , ...res.items]
    this.setState({
      items:newItems
    })
  }
  onFinish = async values => {
    // 给后台发送请求
    // console.log(values)
    await reqAddSubject(values.subjectname, values.parentid)
    message.success('添加课程分类成功')
    // console.log('请求成功了')
    // 添加成功之后,跳回到list页面
    this.props.history.push('/edu/subject/list')
  }
  render() {
    return ( 
        <Card title={
          <>
            <Link to='/edu/subject/list'>
              <ArrowLeftOutlined/>
            </Link>
            <span style={{marginLeft:10}}>新增课程</span>
          </>
        }>
        <Form
        {...layout}
        name='subject'
        //表单校验通过了会触发
        onFinish={this.onFinish}
        // //表单校验没有通过会触发
        // onFinishFailed={onFinishFailed}
        >
        <Form.Item
          //表单项的提示文字
          label='课程分类名称'
          //表单上传数据的键
          name='subjectname'
          //配置表单校验
          rules={[
            {
              required: true,//表示这个表单项是必填项
              //表单校验不成功的提示文字
              message: '请输入课程分类!'
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='父级分类id'
          name='parentid'
          rules={[
            {
              required: true,
              message: '请选择分类id'
            }
          ]}
        >
          <Select
          dropdownRender = {(menu) => {
            return (
              <div>
                {menu}
                <Divider style={{margin:'4px 0'}}/>
                {this.state.total <= this.state.items.length?
                (
                <div style={{ color: 'red', marginLeft: 10 }}>
                  {' '}
                  没有更多数据了
                </div>):
               ( <Button type='link' onClick={this.handleGetSubject}>点击加载更多</Button>)}
              </div>
            )
          }}
          >
               {/* Option是从Select组件上获取到的 */}
              <Select.Option value={0} key={0}>{'一级菜单'}</Select.Option>
              {this.state.items.map(item => (<Select.Option value={item._id} key={item._id}>{item.title}</Select.Option>))}
          </Select>
        </Form.Item>

        <Form.Item>
          {/* htmlType的值是submit 表示这个按钮是一个提交按钮 */}
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
        </Card>
    )
  }
}
