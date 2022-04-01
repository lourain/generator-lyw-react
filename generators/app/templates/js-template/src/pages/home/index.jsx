import React, { useEffect } from 'react'
import { useAuth } from '../../context/auth-context'

export default function Home() {
  const auth = useAuth()
  useEffect(() => {
    auth.signIn({ username: 'qingdao', password: 'Bocom_123' }).then((res) => {
      console.log(res)
    })
  }, [])

  return <div>HOme</div>
}
