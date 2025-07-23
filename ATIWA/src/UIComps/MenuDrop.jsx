import { useContext } from 'react'
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import {AuthContext} from '../context/AuthContext'
import axios from 'axios';



const MenuDrop = () => {
  const {loggedIn, getLoggedIn, user} = useContext(AuthContext)

  const userLogout = async() =>{
    await axios.get('/logout')
    await getLoggedIn()
  }
  const items = [
  {
    key: '1',
    label: (
      <h1>Profile</h1>
    ),
  },
  {
    key: '2',
    label: (
      <h1>Settings</h1>
    ),
  },
  {
    key: '3',
    label: (
      <h1 onClick={userLogout}>Logout</h1>
    ),
  },
  
];

  return (
   <>
   {loggedIn &&
    <Dropdown menu={{ items }} className='p-2 bg-slate-800 rounded-sm'>
    <a onClick={e => e.preventDefault()}>
      <Space>
        Hello {user?.name}
        <DownOutlined className='text-yellow-600' />
      </Space>
    </a>
  </Dropdown>
   }
   </>
  )
}

export default MenuDrop