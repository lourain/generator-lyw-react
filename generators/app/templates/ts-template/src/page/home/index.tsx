import { useAuth } from '@/context/auth-context'
import { Button } from 'antd'
import React, { useEffect } from 'react'

export default function Home() {
  const auth = useAuth()
  useEffect(() => {
    auth.signIn({ username: 'qingdao', password: 'Bocom_123' }).then((res) => {
      console.log(res)
    })
  }, [])
  return (
    <div>
      home
      <Button type="primary">primary</Button>
    </div>
  )
}
