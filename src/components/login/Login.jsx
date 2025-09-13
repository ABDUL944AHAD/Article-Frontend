import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Login.css'
import { API_BASE_URL } from '../../config/Config'

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const [errors, setErrors] = useState({})   // field-specific errors
    const [success, setSuccess] = useState("")
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })

        // clear error when user starts typing
        setErrors((prev) => ({ ...prev, [e.target.name]: "" }))
    }

    const validateForm = () => {
        let newErrors = {}

        if (!formData.email) {
            newErrors.email = "Email is required"
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Enter a valid email"
        }

        if (!formData.password) {
            newErrors.password = "Password is required"
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters"
        }

        return newErrors
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSuccess("")
        setErrors({})

        const newErrors = validateForm()
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        try {
            const res = await axios.post(`${API_BASE_URL}/auth/login`, formData)

            // ✅ Save token and role
            localStorage.setItem("token", res.data.token)
            localStorage.setItem("role", res.data.user.role)
            localStorage.setItem("userId", res.data.user.id)  // <-- add this
            console.log("✅ Login response:", res.data) // debug log
            console.log("🎭 Saved role:", res.data.user.role)

            setSuccess("Login successful!")

            setTimeout(() => navigate("/dashboard"), 1000)
        } catch (err) {
            // API errors for invalid login
            setErrors({ email: "", password: err.response?.data?.message || "Login failed" })
        }
    }

    return (
        <div className='login-container'>
            <div className="login-card">
                <h2 className="login-title">Welcome Back</h2>

                {success && <p className="success-msg">{success}</p>}

                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder='Enter your email'
                        />
                        {errors.email && <p className="field-error">{errors.email}</p>}
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder='Enter your password'
                        />
                        {errors.password && <p className="field-error">{errors.password}</p>}
                    </div>
                    <button type="submit" className='login-btn'>Login</button>
                </form>
                <p className="signup-text">
                    Don’t have an account?{" "}
                    <Link to="/signup" className="signup-link">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Login
