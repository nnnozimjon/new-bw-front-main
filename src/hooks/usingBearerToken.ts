
import { usingAuth } from './usingAuth'

export const usingBearerToken = (): string => {
  const user: any = JSON.parse(usingAuth())
  const token = user?.user?.token;

  return `Bearer ${token}`
}
