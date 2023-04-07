import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useLoginMutation } from '../../../features/auth/authApi';
import { NotificationManager } from 'react-notifications'

export default function Login({ userType }) {
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value })
    }
    const [login, { data, isLoading, error }] = useLoginMutation();
    const navigate = useNavigate()

    useEffect(() => {
        if (error) {
            NotificationManager.error(error.data, "", 5000)
        }
        if (data?.accessToken && data?.user && data?.user?.role === "admin") {
            NotificationManager.success("Login Success", "", 5000)
            navigate("/admin/dashboard")
        } else if (data?.accessToken && data?.user && data?.user?.role === "student") {
            NotificationManager.success("Login Success", "", 5000)
            navigate("/leader-board")
        }
    }, [data, error, navigate])

    const handleSubmit = (e) => {
        e.preventDefault();
        login({
            email: loginData.email,
            password: loginData.password
        })

    }

    return (
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
                <div>
                    <label for="email-address" className="sr-only">Email address</label>
                    <input id="email-address" name="email" type="email" autocomplete="email" required
                        className="login-input rounded-t-md" placeholder="Email address" value={loginData.email}
                        onChange={handleChange} />
                </div>
                <div>
                    <label for="password" className="sr-only">Password</label>
                    <input id="password" name="password" type="password" autocomplete="current-password" required
                        className="login-input rounded-b-md" placeholder="Password" value={loginData.password}
                        onChange={handleChange} />
                </div>
            </div>

            <div className="flex items-center justify-end">
                <div className="text-sm">
                    {
                        userType === "Admin" && (
                            <Link to="#" className="font-medium text-violet-600 hover:text-violet-500">
                                Forgot your password?
                            </Link>
                        )
                    }

                    {
                        userType === "User" && (
                            <Link to="/student-registration" className="font-medium text-violet-600 hover:text-violet-500">
                                Create New Account
                            </Link>
                        )
                    }
                </div>
            </div>

            <div>
                <button disabled={isLoading}
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500">
                    Sign in
                </button>
            </div>
        </form>
    )
}
