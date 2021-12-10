import axios from 'axios'
const instance = axios.create({
  baseURL: 'https://www.fastmock.site/mock/ae8e9031947a302fed5f92425995aa19/jd',
  timeout: 10000
})
export const get = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    instance.get(url, data).then((res) => {
      resolve(res)
    }, (err) => reject(err))
  })
}

export const post = async (url, data = {}) => {
  return (await instance.post(url, data, {
    headers: {
      'Content-type': 'application/json'
    }
  }))
}

export const postTest = async (url, data = {}) => {
  throw new Error('Whoops!')
}

export const getTest = async () => {
  const res = await axios.get('https://www.baidu.com/s', { ie: 'UTF-8', wd: 'test' }, {
    'Access-Control-Allow-Origin': 'http://localhost:8080'
  })
  return res
}
