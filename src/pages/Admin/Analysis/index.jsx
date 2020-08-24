import React, { Component } from 'react'
import {Row,Col,Statistic,Progress } from 'antd'
import Card from '@comps/Card'
import {QuestionCircleOutlined,CaretUpOutlined,CaretDownOutlined} from '@ant-design/icons'
import './index.less'
import { AreaChart,ColumnChart } from 'bizcharts';
const data = [
  { year: '1991', value: 3 },
  { year: '1992', value: 4 },
  { year: '1993', value: 7 },
  { year: '1994', value: 5 },
  { year: '1995', value: 4.9 },
  { year: '1996', value: 6 },
  { year: '1997', value: 12 },
  { year: '1998', value: 9 },
  { year: '1999', value: 13 },
];

const dataSec = [
	{
		type: '家具家电',
		sales: 38,
	},
	{
		type: '粮油副食',
		sales: 52,
	},
	{
		type: '生鲜水果',
		sales: 61,
	},
	{
		type: '美容洗护',
		sales: 145,
	},
	{
		type: '母婴用品',
		sales: 48,
	},
	{
		type: '进口食品',
		sales: 38,
	},
	{
		type: '食品饮料',
		sales: 38,
	},
	{
		type: '家庭清洁',
		sales: 38,
	},
];

const firstRowCol = {
  // xs, md, lg 表示不同的屏幕尺寸 具体见antd文档
  // span表示元素在行中占的格数
  // 一行共24个格
  xs: { span: 24 },
  md: { span: 12 },
  lg: { span: 6 }
}
export default class index extends Component {
  render() {
    return (
      <div>
        <Row gutter={[16, 16]}>
          <Col {...firstRowCol}>
            <Card title={<Statistic title='总销售额' prefix='￥' value={112893} />}
             extra = {<QuestionCircleOutlined />}
             footer={'日销售额 ￥12,423'}
            >
              <span>周同比 12% <CaretUpOutlined style={{color: 'red', marginRight: 10}}/></span>
              <span>日同比 10% <CaretDownOutlined style={{color: 'green'}}/></span>
            </Card>
          </Col>

          <Col {...firstRowCol}>
          <Card title={<Statistic title='访问量' value={22222} />}
             extra = {<QuestionCircleOutlined />}
             footer={'日销售额 ￥12,423'}
            >
             <AreaChart
              data={data}
              // title={{
              //   visible: true,
              //   text: '面积图',
              // }}
              xField='year'
              yField='value'
              padding='0'
              xAxis={{
                visible:false
              }}
              yAxis={{
                visible:false
              }}
              smooth={true}
              color={['hotpink']}
            />
            </Card>
          </Col>

          <Col {...firstRowCol}>
            <Card title={<Statistic title='支付笔数' value={33333} />}
              extra = {<QuestionCircleOutlined />}
              footer={'转化率60%'}
            >
              <ColumnChart
                data={dataSec}
                // title={{
                //   visible: true,
                //   text: '基础柱状图',
                // }}
                forceFit
                padding='0'
                xField='type'
                yField='sales'
                xAxis={{
                  visible:false
                }}
                yAxis={{
                  visible:false
                }}
                meta={{
                  type: {
                    alias: '类别',
                  },
                  sales: {
                    alias: '销售额(万)',
                  },
                }}
              />
            </Card>
          </Col>

          <Col {...firstRowCol}>
            <Card title={<Statistic title='运营结果' value={444444} />}
              extra = {<QuestionCircleOutlined />}
              footer={'转化率80.9%'}
            >
              <Progress
                percent={80.9}
                strokeColor={{
                  from: '#108ee9',
                  to: '#87d068',
                }}
                status="active"
              ></Progress>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}
