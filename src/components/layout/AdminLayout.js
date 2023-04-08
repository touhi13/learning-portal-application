import React, { Fragment } from 'react';
import Nav from '../nav/Nav';

// This component defines the layout for the admin section of the website
// It renders a navigation component and wraps the children components with a section element
export default function AdminLayout({ children }) {
  return (
    <Fragment>
      <Nav /> {/* Render the navigation component */}
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-7xl px-5 lg:px-0">
          {children} {/* Render the children components passed to the layout */}
        </div>
      </section>
    </Fragment>
  );
}
