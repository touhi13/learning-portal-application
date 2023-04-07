import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../../../features/auth/authApi';
import { NotificationManager } from 'react-notifications'


export default function Registration() {
    const [userReg, setUserReg] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserReg({ ...userReg, [name]: value })
    }
    const [register, { data, isLoading, isError, error }] = useRegisterMutation();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (userReg.password !== userReg.confirmPassword) {
            NotificationManager.error("password not match", "", 5000)
        } else {
            register({
                name: userReg.name,
                email: userReg.email,
                password: userReg.password,
                role: "student"
            });
        }
    }

    const navigate = useNavigate()

    useEffect(() => {
        if (error) {
            NotificationManager.error(error.data, "", 5000)
        }
        if (data?.accessToken && data?.user) {
            NotificationManager.success("Login Success", "", 5000)
            navigate("/leader-board")
        }
    }, [data, isError, error, navigate])
    return (
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
                <div>
                    <label for="name" className="sr-only">Name</label>
                    <input id="name" name="name" type="name" autocomplete="name" required
                        className="login-input rounded-t-md" placeholder="Student Name" value={userReg.name}
                        onChange={handleChange} />
                </div>
                <div>
                    <label for="email-address" className="sr-only">Email address</label>
                    <input id="email-address" name="email" type="email" autocomplete="email" required
                        className="login-input " placeholder="Email address" value={userReg.email}
                        onChange={handleChange} />
                </div>
                <div>
                    <label for="password" className="sr-only">Password</label>
                    <input id="password" name="password" type="password" autocomplete="current-password" required
                        className="login-input" placeholder="Password" value={userReg.password}
                        onChange={handleChange} />
                </div>
                <div>
                    <label for="confirm-password" className="sr-only">Confirm Password</label>
                    <input id="confirm-password" name="confirm-password" type="password"
                        autocomplete="confirm-password" required className="login-input rounded-b-md"
                        placeholder="Confirm Password"
                        value={userReg.confirmPassword}
                        onChange={handleChange} />
                    {
                        userReg.password !== userReg.confirmPassword ? (
                            userReg.confirmPassword &&
                            <span style={{ color: "red" }}>Password dose not match</span>) : (
                            userReg.confirmPassword && <span style={{ color: "green" }}>Password matched</span>
                        )
                    }
                </div>
            </div>
            <div className="flex items-center justify-end">
                <div className="text-sm">
                    <Link to="/" className="font-medium text-violet-600 hover:text-violet-500">
                        Already have account?
                    </Link>
                </div>
            </div>
            <div>
                <button disabled={isLoading}
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500">
                    Create Account
                </button>
            </div>

        </form>
    )
}
