import axios from "axios"

const services = (params,data) => {
    const config = {
        method: params.method,
        url: params.url
      };
      let header = {}
      if(params.method !== 'get') {
        header = {
            'Content-Type': 'application/json'
        }
        config.data = data
      }
      if(params.token) {
        header.Authorization = `Bearer ${params.token}`
      }
      config.headers = header
  return axios(config)
}

export default services;