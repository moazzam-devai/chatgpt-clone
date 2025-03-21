import React, { useState, useRef, useEffect } from 'react';
import { Button, Layout, Drawer } from 'antd';
import { Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import { useMediaQuery } from 'react-responsive';
import ModelMenu from './components/ModelMenu';
import Explore from './pages/Explore';

const { Header, Sider, Content } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [activePage, setActivePage] = useState('chatGPT');
  const [modalVisible, setModalVisible] = useState(false);
  const isSmallScreen = useMediaQuery({ maxWidth: 768 });
  const colorBgContainer = 'bg-white';
  
  // Ref for modal content
  const modalRef = useRef(null);

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  // Handle clicks outside the modal to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModalVisible(false);
      }
    };

    if (modalVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalVisible]);

  return (
    <div className="min-h-screen flex flex-col">
      <Layout className="flex-1 flex">
        {isSmallScreen ? (
          <Drawer
            placement="left"
            closable={false}
            onClose={toggleDrawer}
            visible={drawerVisible}
            bodyStyle={{ padding: 0 }}
            width={255}
          >
            <Sidebar setActivePage={setActivePage} activePage={activePage} setCollapsed={setDrawerVisible} collapsed={collapsed} />
          </Drawer>
        ) : (
          !collapsed && (
            <Sider
              trigger={null}
              collapsible
              collapsed={collapsed}
              className={`h-screen overflow-auto bg-slate-100 transition-all duration-200 ease-in-out`}
              width={250}
            >
              <Sidebar setActivePage={setActivePage} activePage={activePage} setCollapsed={setCollapsed} collapsed={collapsed} />
            </Sider>
          )
        )}
        <Layout className={`transition-all duration-200 flex-1 ${colorBgContainer}`}>
        <Header
  className={`p-0 ${colorBgContainer} transition-all duration-200 ${
    isSmallScreen ? 'ms-10' : 'ms-0'
  }`}
>
  <div className="flex justify-between px-1">
    {collapsed ? (
      <div className="flex justify-between px-2 w-full">
        <div>
          <i
            className="fa-solid fa-table-columns p-2 text-slate-500 hoverTab rounded-lg text-lg"
            onClick={toggleSidebar}
          ></i>
          <i className="fa-solid fa-pen-to-square p-2 text-slate-500 hoverTab rounded-lg text-lg"></i>
        </div>
        <div
          className="text-slate-500 hoverTab1 rounded-lg px-1 pt-5 text-lg"
          onClick={toggleModal}
        >
          ChatGPT <i className="fa-solid fa-angle-down text-slate-400"></i>
        </div>
        <div>
          <i className="fa-solid fa-arrow-up-from-bracket p-2 hoverTab1 rounded text-xl text-slate-500"></i>
          <i className="fa-solid fa-circle-user mx-2 text-3xl text-slate-500"></i>
        </div>
      </div>
    ) : (
      <div className="flex justify-between px-2 w-full">
        <div
          className="text-slate-500 hoverTab1 rounded-lg px-1"
          onClick={toggleModal}
        >
          ChatGPT <i className="fa-solid fa-angle-down text-slate-400"></i>
        </div>
        <div>
          <i className="fa-solid fa-arrow-up-from-bracket p-2 hoverTab1 rounded text-xl text-slate-500"></i>
          <i className="fa-solid fa-circle-user mx-2  text-3xl text-slate-500"></i>
        </div>
      </div>
    )}
  </div>
</Header>

          <Content className={`p-5 ${colorBgContainer} relative`}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/explore" element={<Explore />} />
            </Routes>
            {/* Modal */}
      <div
        id="default-modal"
        tabIndex="-1"
        aria-hidden="true"
        className={`${
          modalVisible ? 'block' : 'hidden'
        } overflow-y-auto overflow-x-hidden absolute top-0 right-0 left-5 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
      >
        <div ref={modalRef} className="relative  w-full max-w-xs rounded-lg shadow-lg border max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <ModelMenu/>
            </div>
          </div>
        </div>
      </div>
          </Content>
        </Layout>
      </Layout>
      {isSmallScreen && (
        <Button
          className="fixed top-4 left-5"
          icon={<i className="fa-solid fa-table-columns p-2 text-slate-500 hoverTab rounded-lg text-lg"></i>}
          onClick={toggleDrawer}
          style={{ textDecoration: 'none', border: '0' }}
        />
      )}

      
    </div>
  );
};

export default App;
