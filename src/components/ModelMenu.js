import React from 'react';
import { MessageOutlined } from '@ant-design/icons';
import { BsStars } from "react-icons/bs";
import { GrTechnology } from "react-icons/gr";
import { FaCheckCircle } from "react-icons/fa";
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const ModelMenu = () => {
  return (
    <div className="p-0">
      <div className='sidebar-item flex flex-wrap items-start mx-1 mt-2 mb-4 rounded-lg hoverTab'>
        <div className='rounded-full p-2'>
          <BsStars className='text-slate-500 text-lg' />
        </div>
        <div className='text-start flex-1 ms-1'>
          <p className='mb-1 text-md font-semibold'>ChatGPT Plus</p>
          <p className='text-slate-400 text-xs'>Our smartest model & more</p>
        </div>
        <div className='mt-2 md:mt-0'>
          <div className='rounded-2xl border px-2 py-1 ms-6'>
            <p className='text-sm'>Upgrade</p>
          </div>
        </div>
      </div>

      <div className='sidebar-item flex flex-wrap items-start mx-2 my-2 rounded-lg hoverTab'>
        <div><GrTechnology className='text-slate-500 text-lg' /></div>
        <div className='text-start flex-1 ms-3'>
          <p className='mb-1 text-md font-semibold'>ChatGPT</p>
          <p className='text-slate-400 text-xs'>Great for everyday tasks</p>
        </div>
        <div className='mt-2 md:mt-0'>
          <FaCheckCircle className='text-green-500' />
        </div>
      </div>

      <hr className='my-4'/>

      <div className='sidebar-item flex flex-wrap items-center mx-2 my-2 rounded-lg hoverTab'>
        <MessageOutlined className='text-slate-500 text-lg' />
        <p className='ms-3 text-start flex-1 text-md'>Temporary chat</p>
        <div>
          <FormControl component="fieldset">
            <FormLabel component="legend" className="hidden">Label placement</FormLabel>
            <FormGroup aria-label="position" row>
              <FormControlLabel
                value="end"
                control={<Switch color="primary" />}
                labelPlacement="end"
              />
            </FormGroup>
          </FormControl>
        </div>
      </div>
    </div>
  );
}

export default ModelMenu;
