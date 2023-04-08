/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import learningportal from "../../assets/image/learningportal.svg";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userLoggedOut } from '../../features/auth/authSlice';

const Nav = () => {
    const localStorageData = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("auth")) : null;
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const logOut = () => {
        dispatch(userLoggedOut())
        localStorage.clear();
        navigate("/")
    }
    return (
        <nav className="shadow-md">
            <div className="max-w-7xl px-5 lg:px-0 mx-auto flex justify-between py-3">
                <img className="h-10" src={learningportal} />
                <div className="flex items-center gap-3">
                    <Link to="/course-player/1"
                        className="text-gray-700 hover:text-gray-900 font-medium hover:cursor-pointer active:text-red-600"
                        activeClassName="text-red-600"
                    >
                        Course Access
                    </Link>
                    <Link to="/leader-board"
                        className="text-gray-700 hover:text-gray-900 font-medium hover:cursor-pointer active:text-red-600"
                        activeClassName="text-red-600"
                    >
                        Leaderboard
                    </Link>
                    <h2 className="font-bold">{localStorageData?.user?.name}</h2>
                    <button
                        onClick={(e) => logOut()}
                        className="flex gap-2 items-center px-4 py-1 rounded-full text-sm transition-all bg-red-600 hover:bg-red-700 font-medium">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                            stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                        </svg>
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Nav