import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd'
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  GlobalOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons'

import {Link,withRouter} from 'react-router-dom'
import icons from '@conf/icons'
import { connect } from 'react-redux';
import { defaultRoutes } from '@conf/routes'
const { SubMenu } = Menu

@withRouter
@connect(state => ({ permissionList: state.user.permissionList }))
class SideMenu extends Component {
  //根据数据渲染menu
  //数据:routes.js里面的defaultRoutes redux->permissionList
  renderMenu = routes => {

    return routes.map(route => {
      //hidden true不渲染 false才渲染
      if(route.hidden) return
      const Icon = icons[route.icon]
      if(route.children && route.children.length){
        return (
          <SubMenu key={route.path} icon={<Icon />} title={route.name}>
            {route.children.map(SecItem => {
              if (SecItem.hidden) return null
              return (
                <Menu.Item key={route.path + SecItem.path}>
                  <Link to={route.path + SecItem.path}>
                    {SecItem.name}
                  </Link>
                </Menu.Item>
              )
            })}
          </SubMenu>
        )
      }else{
        return(
          <Menu.Item key={route.path} icon={<Icon />}>
               { route.path === '/' ? <Link to='/'>{route.name}</Link> :route.name}
          </Menu.Item>
        )
      }
    })
  }
  render() {
    const pathname = this.props.location.pathname
    const matchArr =  pathname.match(/[/][a-z]+/)
    const openKey = matchArr && matchArr[0]
    return (
      <div>
        <Menu theme='dark' defaultSelectedKeys={[pathname]} defaultOpenKeys={[openKey]} mode='inline'>
          {this.renderMenu(defaultRoutes)}
          {this.renderMenu(this.props.permissionList)}
            {/* <Menu.Item key='1' icon={<PieChartOutlined />}>
              Option 1
            </Menu.Item>
            <Menu.Item key='2' icon={<DesktopOutlined />}>
              Option 2
            </Menu.Item>
            <SubMenu key='sub1' icon={<UserOutlined />} title='User'>
              <Menu.Item key='3'>Tom</Menu.Item>
              <Menu.Item key='4'>Bill</Menu.Item>
              <Menu.Item key='5'>Alex</Menu.Item>
            </SubMenu>
            <SubMenu key='sub2' icon={<TeamOutlined />} title='Team'>
              <Menu.Item key='6'>Team 1</Menu.Item>
              <Menu.Item key='8'>Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key='9' icon={<FileOutlined />} /> */}
          </Menu>
      </div>
    );
  }
}

export default SideMenu;
