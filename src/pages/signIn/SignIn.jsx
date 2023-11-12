import React, { useState } from 'react'
import { Col, Row, Image } from 'antd'
import logo from '../../img/logo.png'
import { FcGoogle } from 'react-icons/fc'
import { signInWithGoogle } from '../../firebase/GoogleSignin'

const SignIn = () => {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <Row>
      <Col
        xl={24}
        lg={24}
        md={24}
        sm={24}
        xs={24}
        className='flex items-center justify-center bg-red'
      >
        <div className='bg-white p-4 rounded-md'>
          <div className='text-[2rem] text-navy font-bold mb-8 text-center'>
            {isLogin ? 'Sign In' : 'Sign up'}
          </div>
          <div
            className='rounded-lg h-[2rem] min-w-[5rem] w-full border transition-all hover:border-navy border-sea bg-white px-4 py-1 border-1  cursor-pointer hover:shadow mb-4 flex items-center justify-between hover:bg-navy group'
            onClick={() => signInWithGoogle()}
          >
            <span className='text-md font-semibold group-hover:text-white group-hover:ml-4 transition-all ease-in duration-300'>
              Google
            </span>
            <FcGoogle className='text-xl group-hover:mr-4 transition-all ease-in duration-300' />
          </div>
          <p>
            Already have an account?{' '}
            <span
              className='font-semibold underline cursor-pointer'
              onClick={() => setIsLogin(!isLogin)}
            >
              {!isLogin ? 'Sign In' : 'Sign up'}
            </span>
          </p>
        </div>
      </Col>
    </Row>
  )
}

export default SignIn
