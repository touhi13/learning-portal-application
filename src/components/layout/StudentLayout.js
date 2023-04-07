import React, { Fragment } from 'react'
import Nav from '../nav/Nav'


export default function StudentLayout({children}) {
    return (
        <Fragment>
            <Nav />
            <section className="py-6 bg-primary">
                <div className="mx-auto max-w-7xl px-5 lg:px-0">
                    {children}
                </div>
            </section>
        </Fragment>
    )
}
