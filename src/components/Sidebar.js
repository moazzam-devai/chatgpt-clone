import React, { useEffect } from 'react';
import { Menu } from 'antd';
import { 
  ProductFilled, 
} from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { BsStars } from "react-icons/bs";
import { useMediaQuery } from 'react-responsive';

const Sidebar = ({ setActivePage, activePage, setCollapsed, collapsed }) => {
  const location = useLocation();
  const isSmallScreen = useMediaQuery({ maxWidth: 768 });

  useEffect(() => {
    const path = location.pathname.replace('/', '') || 'chatGPT';
    setActivePage(path);
  }, [location, setActivePage]);

  return (
    <Menu
      theme=""
      mode="inline"
      selectedKeys={[activePage]}
      style={{ paddingTop: 0 }}
      className='bg-slate-100 relative'
    >
      <div className='bg-slate-100 h-screen'>
      {isSmallScreen ? (
        <>
        <div className='pt-5'>
          <Link to="/">
          <div className='sidebar-item flex mx-4 mb-8 p-1 rounded-lg bg-inherit hover:bg-[#e4e3e3]'>
            <img src='./logo.png' style={{width:'18px'}} alt="chatgpt logo" />
            <p className='ms-3 pt-2 text-start'>ChatGPT</p>
          </div>
          </Link>
          <Link to="/explore">
          <div className='sidebar-item flex mx-4 p-1 rounded-lg hoverTab'>
            <ProductFilled className='text-slate-500' />
            <p className='ms-4 pt-2 text-start'>Explore GPTs</p>
          </div>
          </Link>
          <div className='flex absolute bottom-0 p-2 flex items-center width-full'>
            <BsStars className='text-xl mb-2' />
            <div className='text-start'>
              <p className='ms-3 mb-2 me-auto items-start'>Upgrade plan</p>
              <p className='ms-3 text-slate-400 text-xs'>Get GPT-4, DALL.E, and more</p>
            </div>
          </div>
        </div>
        </>
      ) : (
        <>
        <div className='flex justify-between py-2 px-3'>
          <i className="fa-solid fa-table-columns p-2 text-slate-500 hoverTab rounded-lg text-lg" onClick={() => setCollapsed(!collapsed)}></i>
          <i className="fa-solid fa-pen-to-square p-2 text-slate-500 hoverTab rounded-lg text-lg"></i> 
        </div>
        <div className='mt-2'>
          <Link to='/' ><div className='sidebar-item flex mx-3 mb-7 p-2 rounded-lg hoverTab'>
          <img src='./logo.png' style={{width:'18px'}} alt="chatgpt mobile logo" />
            <p className='ms-3 pt-2 text-start'>ChatGPT</p>
          </div></Link>
          <Link to='/explore'><div className='sidebar-item flex mx-4 p-2 rounded-lg hoverTab'>
            <ProductFilled className='text-slate-500' />
            <p className='ms-4 pt-2 text-start'>Explore GPTs</p>
          </div></Link>
          <div className='flex absolute bottom-0 p-4 flex items-center'>
            <BsStars className='text-xl mb-2' />
            <div className='text-start'>
              <p className='ms-3 mb-2 me-auto items-start'>Upgrade plan</p>
              <p className='ms-3 text-slate-400 text-xs'>Get GPT-4, DALL.E, and more</p>
            </div>
          </div>
        </div>
        </>
        
      )}
      </div>
    </Menu>
  );
};

Sidebar.propTypes = {
  setCollapsed: PropTypes.func.isRequired,
  collapsed: PropTypes.bool.isRequired,
  setActivePage: PropTypes.func.isRequired,
  activePage: PropTypes.string.isRequired,
};

export default Sidebar;
