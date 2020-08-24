import React from "react";
import { Router } from "react-router-dom";
import history from "@utils/history";
import {connect} from 'react-redux'

import Layout from "./layouts";
// 引入重置样式（antd已经重置了一部分了）

//(国际化组件)
import {IntlProvider} from 'react-intl'

import { zh, en } from './locales'

import "./assets/css/reset.css";
import {ConfigProvider} from 'antd'
import enUS from 'antd/es/locale/en_US';
import zhCN from 'antd/es/locale/zh_CN';

function App(props) {
  const locale = props.intl
  const message = locale === 'en' ? en : zh
  const antdlocale = locale === 'en' ? enUS : zhCN
  return (
    <Router history={history}>
      <ConfigProvider locale={antdlocale}>
        <IntlProvider locale={locale} messages={message}>
          <Layout />
        </IntlProvider>
      </ConfigProvider>
    </Router>
  );
}

export default connect(state => ({intl:state.intl}))(App);
