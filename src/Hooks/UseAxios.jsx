import axios from 'axios'
import React from 'react'

function UseAxios() {
    const axiosInstance = axios.create({
        baseURL: 'https://scms-server-side.vercel.app/'
    })
  return axiosInstance;
}

export default UseAxios