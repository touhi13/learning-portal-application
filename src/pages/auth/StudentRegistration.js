import React from 'react'
import AuthLayout from '../../components/layout/AuthLayout'
import Registration from '../../components/form/auth/Registration'

export default function StudentRegistration() {
    return (
        <AuthLayout title="Create Your New Account">
            <Registration />
        </AuthLayout>
    )
}
