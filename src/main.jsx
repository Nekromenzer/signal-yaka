import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ConfigProvider } from 'antd'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ConfigProvider
      theme={{
        components: {
          Button: {
            colorPrimary: '#1d3557',
            colorPrimaryHover: '#457b9d',
            colorBgContainer: '#f1faee',
            colorBorder: '#1d3557',
            borderRadius: 8,
            fontSize: '1rem'
          },
          Input: {
            colorPrimary: '#1D3557',
            algorithm: true
          }
        }
      }}
    >
      <App />
    </ConfigProvider>
  </BrowserRouter>
)
