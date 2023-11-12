import React from 'react'
import { Button, Checkbox, Form, Input } from 'antd'

const ZerpForm = ({
  formName = 'login',
  formItems,
  onFinishFailed,
  onFinish,
  labelCol = { span: 24 },
  wrapperCol = { span: 24 },
  remember = false,
  minWidth = 300,
  maxWidth = 800,
  autoComplete = 'off',
  disabled = false,
  submitText
}) => {
  return (
    <Form
      name={formName}
      labelCol={labelCol}
      wrapperCol={wrapperCol}
      style={{
        minWidth,
        maxWidth
      }}
      initialValues={{
        remember
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete={autoComplete}
      disabled={disabled}
    >
      {formItems.map((item, index) => {
        if (item.type === 'checkbox') {
          return (
            <Form.Item
              key={index}
              name={item.name}
              valuePropName={item.valuePropName}
              wrapperCol={{
                offset: 8,
                span: 16
              }}
            >
              <Checkbox>{item.label}</Checkbox>
            </Form.Item>
          )
        }
        if (item.type === 'password') {
          return (
            <Form.Item
              key={index}
              label={!item.noLabel ? item.label : ''}
              name={item.name}
              rules={
                item.rule || [
                  {
                    required: true,
                    message: `Please input your ${item.label}!`
                  }
                ]
              }
            >
              <Input.Password placeholder={item.placeholder} />
            </Form.Item>
          )
        }
        return (
          <Form.Item
            key={index}
            label={!item.noLabel ? item.label : ''}
            name={item.name}
            rules={
              item.rule || [
                {
                  required: true,
                  message: `Please input your ${item.label}!`
                }
              ]
            }
          >
            <Input placeholder={item.placeholder} />
          </Form.Item>
        )
      })}
      <Form.Item
        wrapperCol={{
          span: 24
        }}
      >
        <Button
          type='primary'
          htmlType='submit'
          className='bg-navy px-3 w-full text-white font-semibold hover:!text-cloud hover:bg-red border-none mt-4'
        >
          {submitText}
        </Button>
      </Form.Item>
    </Form>
  )
}

export default ZerpForm
