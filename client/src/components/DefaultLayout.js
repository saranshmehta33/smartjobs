import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  HomeOutlined,
  PlusSquareOutlined,
  PlusOutlined,
  CheckOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import { Link } from 'react-router-dom';
import Filter from './Filter';
const { Header, Sider, Content } = Layout;
const DefaultLayout = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

 function logout(){
    localStorage.removeItem('user')
    window.location.reload()
  }

  const user = JSON.parse(localStorage.getItem('user'))
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}
        style={{position: 'sticky' , overflow : 'auto' , height : '100%' , top:0}}
      >
        <div className="logo" >
            {collapsed ? (<h1>SJ</h1>) : (<h1>SmartJobs</h1>)}
        </div>
        <Menu
        
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[window.location.pathname]}
          items={[
            {
              key: '/',
              icon: <HomeOutlined/>,
              label: <Link to='/'>Home</Link>,
            },
            {
              key: '/profile',
              icon: <UserOutlined/>,
              label: <Link to='/profile'>Profile</Link>,
            },
            {
              key: '/appliedjobs',
              icon: <PlusSquareOutlined/>,
              label: <Link to='/appliedjobs'>Applied Jobs</Link>,
            },
            {
              key: '/postjob',
              icon: <PlusOutlined/>,
              label: <Link to='/postjob'>Post Job</Link>,
            },
            {
              key: '/posted',
              icon: <CheckOutlined />,
              label: <Link to='/posted'>Posted</Link>,
            },
            {
              key: '/logout',
              icon: <LogoutOutlined />,
              label: <Link onClick={logout}>Logout</Link>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer, position: 'sticky' , overflow : 'auto' , top:0, zIndex:9999 
          }}
        >

          <div className="flex justify-content-between">

              <div>
              <Button
                className='basic-btn'
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: '16px',
                  width: 64,
                  height: 64,
                }}
              />
              </div>

              <div>
                 <Filter />
              </div>

              <div style={{display : collapsed ? 'none' : 'inline'}}>
                    <h4 className="mr-2"><b>{user.username}</b></h4>
              </div>

          </div>
          
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          {props.children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;