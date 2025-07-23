import React from 'react'
import { Skeleton } from 'antd';

const Loader = () => {
  return (
    <Skeleton avatar paragraph={{ rows: 6 }} active />
  )
}

export default Loader