import React from 'react'
import learningPortalLogo from '../../assets/image/learningportal.svg'

export default function AuthLayout({ children, title }) {
    return (
        <section className="py-6 bg-primary h-screen grid place-items-center">
            <div className="mx-auto max-w-md px-5 lg:px-0">
                <div>
                    <img className="h-12 mx-auto" src={learningPortalLogo} alt="learningportal" />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
                        {title}
                    </h2>
                </div>
                {children}
            </div>
        </section>
    )
}
