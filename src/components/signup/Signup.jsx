import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Signup.css'
import { API_BASE_URL } from '../../config/Config'

const Signup = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    })

    // store errors for each field
    const [errors, setErrors] = useState({})
    const [success, setSuccess] = useState("")

    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
        setErrors({ ...errors, [e.target.name]: "" }) // clear field error when typing
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors({})
        setSuccess("")

        try {
            const res = await axios.post(`${API_BASE_URL}/auth/signup`, formData)
            setSuccess(res.data.message || "Signup successful!")

            // redirect after 1s
            setTimeout(() => navigate("/login"), 1000)
        } catch (err) {
            // handle validation or server error
            const msg = err.response?.data?.message || "Signup failed"

            if (msg.toLowerCase().includes("name")) {
                setErrors({ name: msg })
            } else if (msg.toLowerCase().includes("email")) {
                setErrors({ email: msg })
            } else if (msg.toLowerCase().includes("password")) {
                setErrors({ password: msg })
            } else {
                setErrors({ general: msg })
            }
        }
    }

    return (
        <div className="signup-container">
            <div className="signup-card">
                <h2 className="signup-title">Create Account</h2>

                {errors.general && <p className="error-msg">{errors.general}</p>}
                {success && <p className="success-msg">{success}</p>}

                <form className="signup-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            required
                        />
                        {errors.name && <p className="error-msg">{errors.name}</p>}
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                        />
                        {errors.email && <p className="error-msg">{errors.email}</p>}
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            required
                        />
                        {errors.password && <p className="error-msg">{errors.password}</p>}
                    </div>

                    <button type="submit" className="signup-btn">Sign Up</button>
                </form>

                <p className="login-text">
                    Already have an account?{" "}
                    <Link to="/login" className="login-link">Login</Link>
                </p>
            </div>
        </div>
    )
}

export default Signup
