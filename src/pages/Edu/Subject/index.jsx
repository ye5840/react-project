import React, { Component } from 'react'
import { Button, Table, Tooltip,Input, message,Modal} from 'antd'
import { PlusOutlined, FormOutlined, DeleteOutlined } from '@ant-design/icons'
import {connect} from 'react-redux'
import {getSubjectList,getSecSubjectList,updateSubjectList,delSubjectList} from './redux'
import {reqUpdateSubject} from '@api/edu/subject'
import './index.less'

@connect(
  state => ({subjectList:state.subjectList}),
  {getSubjectList,getSecSubjectList,updateSubjectList,delSubjectList}
)
class Subject extends Component {
  state = {
    //subjectid有之值，渲染input,没有就渲染一个普通的标题
    subjectid:'',
    title:''
  }
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
    if(expanded){
      this.props.getSecSubjectList(record._id)
    }
  }
  handleToAdd = () => {
    this.props.history.push('/edu/subject/add')
  }
  //更新按钮的事件处理函数
  handleUpdate = ({_id,title}) => () => {
    this.setState({
      subjectid:_id,
      title:title
    })
    this.title = title
  }
  handleUpdateChange = e => {
    this.setState({
      title:e.target.value
    })
  }
  handleCancle = () => {
    this.setState({
      subjectid:'',
      title:''
    })
  }
  handleUpdateConfirm = async () =>{
    if(!this.state.title.trim()){
      message.success('请输入正确的标题名称')
      return 
    }
    if(this.state.title === this.title){
      message.success('新的标题名称和旧的标题名称不能相同')
      return
    }
    let id = this.state.subjectid
    let title = this.state.title
    // await reqUpdateSubject(id,title)
    await this.props.updateSubjectList(id,title)
    message.success('数据更新成功')
    this.setState({
      subjectid:'',
      title:''
    })
    // this.props.getSubjectList(1,10)
  }
  handleDel = record =>  () =>{
    // record._id
    Modal.confirm({
      title:(
      <div>
        你确定要删除
        <span style={{color:'red',margin:'0 10px'}}>{record.title}</span>
        课程分类吗？
      </div>
      ),
      onOk:async () => {
        await this.props.delSubjectList(record._id)
        message.success('数据删除成功')
        if(record.parentId === '0'){
          if( this.page > 1 && 
            this.props.subjectList.items.length <= 0 && 
            record.parentId === '0'){
              this.props.getSubjectList(--this.page,10)
              return
          }
          this.props.getSubjectList(this.page,10)
        }
      }
    })
  }
  render() {
    const columns = [
      /**
       * title: 表示这一列的标题
       * dataIndex: 表示这一列中要展示data数据的中哪一项值
       * key: 唯一id
       */
      { title: '分类名称',
        // dataIndex: 'title', 
        key: 'name',
        render:record => {
          if(this.state.subjectid === record._id){
            return (
            <Input 
              style={{width:300}} 
              value={this.state.title}
              onChange={this.handleUpdateChange}
            ></Input>
            )
          }
          return record.title
        }
      },
      {
        title: '操作',
        // 注意: 如果这一列不展示data中的数据,那么就可以不写dataIndex,或者是值为空的字符串
        // dataIndex: 'age',
        key: 'x',
        render: record => {
          if(this.state.subjectid === record._id){
            return (
              <>
                <Button type='primary' style={{marginRight:10}} onClick={this.handleUpdateConfirm}>确认</Button>
                <Button type='danger' onClick={this.handleCancle}>取消</Button>
              </>
            )
          }else{
            return (
              <>
                <Tooltip title='更新课程'>
                  <Button
                    type='primary'
                    icon={<FormOutlined />}
                    style={{ marginRight: 20, width: 40 }}
                    onClick={this.handleUpdate(record)}
                    // size='large'
                    // style={{ width: 40 }}
                  ></Button>
                </Tooltip>
                <Tooltip title='删除课程'>
                  <Button
                    type='danger'
                    icon={<DeleteOutlined />}
                    // size='large'
                    style={{ width: 40 }}
                    onClick={this.handleDel(record)}
                  ></Button>
                </Tooltip>
              </>
            )
          }
        },
        width: 200
      }
    ]
    return (
      <div className='subject'>
        <Button type='primary' icon={<PlusOutlined />} className='subject-btn' onClick={this.handleToAdd}>
          新建
        </Button>

        <Table
          columns={columns}
          expandable={{
            // expandedRowRender: record => (
            //   <p style={{ margin: 0 }}>{record.description}</p>
            // ),
            // rowExpandable: record => record.name !== 'Not Expandable'
            onExpand:this.handleExpand
          }}
          dataSource={this.props.subjectList.items}
          rowKey='_id'
          pagination={{
            total:this.props.subjectList.total,
            showSizeChanger:true,
            pageSizeOptions:['5','10','15'],
            showQuickJumper:true,
            defaultPageSize: 10, 
            onChange: this.handleChange,
            onShowSizeChange:this.handleShowSizeChange,
            current:this.page
          }}
        />
      </div>
    )
  }
}
export default Subject
