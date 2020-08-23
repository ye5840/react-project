import React, { useState,useEffect } from "react";
import { Form, Input, Select, Cascader, Button } from "antd";

import "./index.less";
import {reqAllSubjectList,reqGetSecSubject} from '@api/edu/subject'
import {reqGetAllTeacherList} from '@api/edu/teacher'
const { Option } = Select;

function SearchForm() {
  const [form] = Form.useForm();
  const [subjects,setSubjects] = useState([])
  const [teachers,setTeachers] = useState([])
  const [options,setOptions] = useState([])
  useEffect(() =>{
    async function fetchData(){
      // await reqAllSubjectList()
      // await reqGetAllTeacherList()
      const [subject,teacher] = await Promise.all([
        reqAllSubjectList(),
        reqGetAllTeacherList()
      ])
      setSubjects(subject)
      setTeachers(teacher)
      const optionList = subject.map(item => {
        return {
          value: item._id,
          label: item.title,
          isLeaf: false
        }
      })
      setOptions(optionList)
    }
    fetchData()
  },[])
  // const [options, setOptions] = useState([
  //   {
  //     value: "zhejiang",
  //     label: "Zhejiang",
  //     isLeaf: false
  //   },
  //   {
  //     value: "jiangsu",
  //     label: "Jiangsu",
  //     isLeaf: false
  //   }
  // ]);
  
  const onChange = (value, selectedOptions) => {
    console.log(value, selectedOptions);
  };

  const loadData = async selectedOptions => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;
    console.log(targetOption)
    const res = await reqGetSecSubject(targetOption.value)
    targetOption.loading = false;
    if(res.items.length){
      targetOption.children = res.items.map(item => {
        return {
          value:item._id,
          label:item.title,
          //默认为true，可不写
          //isLeaf =  true
        }
      })
    }else{
        targetOption.isLeaf =  true
    }
    setOptions([...options])
  };

  const resetForm = () => {
    form.resetFields();
  };

  return (
    <Form layout="inline" form={form}>
      <Form.Item name="title" label="标题">
        <Input placeholder="课程标题" style={{ width: 250, marginRight: 20 }} />
      </Form.Item>
      <Form.Item name="teacherId" label="讲师">
        <Select
          allowClear
          placeholder="课程讲师"
          style={{ width: 250, marginRight: 20 }}
        >
          {/* <Option value="lucy1">Lucy1</Option>
          <Option value="lucy2">Lucy2</Option>
          <Option value="lucy3">Lucy3</Option> */}
          {teachers.map(item => (
            <Option key={item._id} value={item._id}>{item.name}</Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name="subject" label="分类">
        <Cascader
          style={{ width: 250, marginRight: 20 }}
          options={options}
          loadData={loadData}
          onChange={onChange}
          changeOnSelect
          placeholder="课程分类"
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{ margin: "0 10px 0 30px" }}
        >
          查询
        </Button>
        <Button onClick={resetForm}>重置</Button>
      </Form.Item>
    </Form>
  );
}

export default SearchForm;
