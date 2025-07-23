import React from 'react'
import { Button, Result } from 'antd';

const ErrorPage = () => {
  return (
    <Result
    status="404"
    title="Error"
    subTitle="Sorry, Could not fetch data fromt the server."
    
  />
  )
}

export default ErrorPage