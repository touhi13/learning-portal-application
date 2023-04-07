import React from 'react'
import AuthLayout from '../../components/layout/AuthLayout'
import Login from '../../components/form/auth/Login'

export default function AdminLogin() {
    const userType = 'Admin'
    return (
        <AuthLayout title="Sign in to Admin Account">
            <Login {...{userType}}/>
        </AuthLayout>
    )
}
