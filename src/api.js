import axios from 'axios'

export const instance = axios.create({
    baseURL:"https://gvg-backend.vercel.app/gvg"
})
// export const instance = axios.create({
//     baseURL:"http://localhost:4000/gvg"
// })