import axios from 'axios'

export const instance = axios.create({
    baseURL:"https://gvg-backend-hg3smhlso-sreedev-ss-projects.vercel.app/gvg"
})