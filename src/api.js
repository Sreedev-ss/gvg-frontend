import axios from 'axios'

export const instance = axios.create({
    baseURL:"https://gvg-backend-jot3gt0ae-sreedev-ss-projects.vercel.app/gvg"
})