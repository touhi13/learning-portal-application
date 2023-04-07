import React from 'react'
import AuthLayout from '../../components/layout/AuthLayout'
import Login from '../../components/form/auth/Login'

export default function StudentLogin() {
  const userType = 'User';
  return (
    <AuthLayout title="Sign in to Student Account">
      <Login {...{userType}}/>
    </AuthLayout>
  )
}
