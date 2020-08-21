import React, { Component } from 'react'
import {Button,Upload} from 'antd'
import {UploadOutlined} from '@ant-design/icons'
import * as qiniu from 'qiniu-js'
import { nanoid } from 'nanoid'
import {reqGetUploadToken} from '@api/edu/lesson'
export default class MyUpload extends Component {
  constructor(){
    super()
    const jsonStr = localStorage.getItem('uploadToken')

    if(jsonStr){
      this.tokenObj = JSON.parse(jsonStr)
      return
    }
    this.tokenObj = {}
  }
  handleBeforeUpload =  (file,fileList) => {
    const MAX_SIZE = 10 * 1024 * 1024
    // console.log(file)
    return new Promise(async (resolve,reject) => {
      if(file.size > MAX_SIZE){
        return reject()
      }
      if(this.tokenObj.expires && this.tokenObj.expires> Date.now()){
        return resolve()
      }
      const res = await reqGetUploadToken()
      // console.log(res)
      res.expires = Date.now() + res.expires * 1000 - 2 * 60 * 1000
      this.tokenObj = res
      const jsonObj = JSON.stringify(res)
      localStorage.setItem('uploadToken',jsonObj)
      resolve()
    })
  }
  handleCustomRequest=({file,onProgress,onError,onSuccess}) => {
    // console.log('实现视频上传')
    const observer = {
      next(res){
        // ...
        // console.log(res)
        onProgress({percent:res.total.percent})
      },
      error(err){
        // ...
        // console.log('上传错误',err)
        onError(err)
      },
      complete:res => {
        // ...
        // console.log('上传成功',res)
        onSuccess(res)
        this.props.onChange('http://qfevjkiwt.hn-bkt.clouddn.com' + res.key)
      }
    }
    // const file = options.file
    const key = nanoid(10)
    const token = this.tokenObj.uploadToken
    const config = {
      region: qiniu.region.z2
    };
    const putExtra = {
      mimeType: "video/*"
    };
    const observable = qiniu.upload(file, key, token, putExtra, config)
    this.subscription = observable.subscribe(observer) // 上传开始
  }
  componentDidMount() {
    this.subscription && this.subscription.unsubscribe() // 上传取消
  }
  handleRemove = () => {
    this.props.onChange('')
  }
  render() {
    return (
        <Upload
          beforeUpload={this.handleBeforeUpload}
          customRequest={this.handleCustomRequest}
          onRemove={this.handleRemove}
        >
          <Button>
            <UploadOutlined /> 上传视频
          </Button>
        </Upload>
    )
  }
}
