import React from 'react'

export default function NavLateral(props) {
  return (
    <>
    <div className="drawer-side">
        <label htmlFor="my-drawer-3" className="drawer-overlay"></label> 
        <ul className="menu p-4 overflow-y-auto w-80 bg-base-100">
            <li>
                <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                </label>
            </li>
            {props.children}

        </ul>
    </div>
    </>
  )
}
