'use client'
import React, { useDebugValue } from 'react'
import { Button, Form, Radio, message } from 'antd'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { setLoading } from '@/redux/loaderSlice'
import PageTitle from '@/components/PageTitle'

function Login() {
  const dispatch = useDispatch();
  const router = useRouter();
  const onFinish = async (values: any) => {
    try {
      dispatch(setLoading(true))
      const response = await axios.post("/api/users/login", values)
      message.success(response.data.message);
      router.push("/");
    } catch (error: any) {
      message.error(error.response.data.message || "Something went wrong")
    }
    finally {
      dispatch(setLoading(false))
    }
  }
  return (
    <div className="flex justify-center h-screen items-center bg-primary">
        <div className='card p-5 w-450'>
        <h1 className='text-xl'>Job Hunt - Login</h1>
        <hr /> 
        <Form
          layout='vertical'
          className='flex  flex-col gap-5'
          onFinish={onFinish} //Will execute on submit form
        >

          <Form.Item label="Email" name="email">
            <input type="email" className="input" />
          </Form.Item>

          <Form.Item label="Password" name="password">
            <input type="password" className="input" />
          </Form.Item>

          <Button type='primary' htmlType='submit' className='bg-primary' block>Login</Button>

          <Link href="/register">Don't have an account? Register</Link>

        </Form>
      </div>
    </div>
  )
}

export default Login
