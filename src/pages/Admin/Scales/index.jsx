import React, { Component } from 'react'

import {Card,Button,DatePicker} from 'antd'

import moment from 'moment'

const tabListNoTitle = [
  {
    key: 'scales',
    tab: '销售量',
  },
  {
    key: 'visit',
    tab: '访问量',
  },
];

const contentListNoTitle = {
  scales: <p>article content</p>,
  visit: <p>app content</p>,
};

const { RangePicker } = DatePicker;
export default class index extends Component {
  state = {
    noTitleKey:'scales',
    dateFlag:'day',
    rangDate:[moment(),moment()]
  };

  onTabChange = key => {
    // console.log(key, type);
    // this.setState({ [type]: key });
    this.setState({
      noTitleKey:key
    })
  };
  handleButtonClick = flag => () => {
    let rangDate=[]
    switch(flag){
        case 'day':
          rangDate = [moment(),moment()]
          break;
        case 'week':
          rangDate = [moment(),moment().add(7,'d')]
          break;
        case 'mouth':
          rangDate = [moment(),moment().add(1,'m')]
          break;
        case 'year':
          rangDate = [moment(),moment().add(1,'y')]
          break;
    }
    this.setState({
      dateFlag:flag,
      rangDate:[]
    })
  }
  handleRangePickerChange = momentArr => {
    this.setState({
      rangDate:momentArr
    })
  }
  render() {
    const Extra = (<>
        <Button type={this.state.dateFlag==='day'?'link':'text'} onClick={this.handleButtonClick('day')}>今日</Button>
        <Button type={this.state.dateFlag==='week'?'link':'text'} onClick={this.handleButtonClick('week')}>本周</Button>
        <Button type={this.state.dateFlag==='mouth'?'link':'text'} onClick={this.handleButtonClick('mouth')}>本月</Button>
        <Button type={this.state.dateFlag==='year'?'link':'text'} onClick={this.handleButtonClick('year')}>本年</Button>
        <RangePicker
          value={this.state.rangDate}
          onChange={this.handleRangePickerChange}
        ></RangePicker>
    </>)
    return (
      <div>
        <Card
          style={{ width: '100%' }}
          tabList={tabListNoTitle}
          activeTabKey={this.state.noTitleKey}
          tabBarExtraContent={Extra}
          onTabChange={this.onTabChange}
        >
          {contentListNoTitle[this.state.noTitleKey]}
        </Card>
      </div>
    )
  }
}
