import { cleanEnv, str } from 'envalid'

export const config = cleanEnv(import.meta.env, {
  VITE_API_URL: str()
})
