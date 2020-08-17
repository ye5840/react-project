import React, { Component } from "react";
import {Button,Table,Tooltip } from 'antd'
import {PlusOutlined,FormOutlined,DeleteOutlined } from '@ant-design/icons'
import {connect} from 'react-redux'
import './index.less'
import {getSubjectList,getSecSubjectList} from './redux'
const columns = [
  { title: '分类名称', dataIndex: 'title', key: 'name' },
  {
    title: '操作',
    // dataIndex: '',
    key: 'x',
    render: () => (
      <>
      <Tooltip title="更新课程">
        <Button type='primary' icon={<FormOutlined />} style={{marginRight:20,width:40}}></Button>
      </Tooltip>
      <Tooltip title="删除课程">
        <Button type='danger' icon={<DeleteOutlined />} style={{width:40}}></Button>
      </Tooltip>
      </>
    ),
    width:200
  },
];
const data = [
  {
    key: 1,
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
  },
  {
    key: 2,
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
  },
  {
    key: 3,
    name: 'Not Expandable',
    age: 29,
    address: 'Jiangsu No. 1 Lake Park',
    description: 'This not expandable',
  },
  {
    key: 4,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
  },
];

@connect(
  state => ({subjectList:state.subjectList}),
  {getSubjectList,getSecSubjectList}
)
class Subject extends Component {
  page = 1
  componentDidMount() {
    this.props.getSubjectList(1,10)
  }
  handleChange = (page,pageSize) => {
    this.page = page
    this.props.getSubjectList(page,pageSize)
  }
  handleShowSizeChange = (page,pageSize) => {
    this.props.getSubjectList(page,pageSize)
  }
  handleExpand = (expanded,record) => {
    // console.log(expanded,record)
    if(expanded){
      this.props.getSecSubjectList(record._id)
    }
  }
  render() {
    console.log(this.props)
    return (
    <div className='subject'>
      <Button type="primary" icon={<PlusOutlined />} className='subject-btn'>
       新建
      </Button>
      <Table
        columns={columns}
        expandable={{
          // expandedRowRender: record => <p style={{ margin: 0 }}>{record.description}</p>,
          // rowExpandable: record => record.name !== 'Not Expandable',
          onExpand : this.handleExpand
        }}
        dataSource={this.props.subjectList.items}
        rowKey='_id'
        pagination={{
          total:this.props.subjectList.total,
          showSizeChanger:true,
          pageSizeOptions:['5','10','15'],
          showQuickJumper:true,
          defaultPageSize:10,
          // onChange:(page,pageSize) => {
          //   console.log(page,pageSize)
          // }
          onChange:this.handleChange,
          onShowSizeChange:this.handleShowSizeChange,
          current:this.page
        }}
      />,
    </div>
    )
  }
}
export default Subject
