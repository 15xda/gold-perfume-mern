import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../api/axiosInstance';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    try {
      const response = await api.post('/auth/reset-password', { email });
      toast.success('Reset link sent to your email!');
    } catch (error) {
      console.error(error)
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1>Reset Password</h1>
        {!submitted ? (
          <>
            <p className="auth-description">
              Enter your email address and we'll send you instructions to reset your password.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="auth-submit">Send Reset Link</button>
            </form>
          </>
        ) : (
          <div className="auth-success">
            <span className="material-icons success-icon">check_circle</span>
            <p>Check your email for password reset instructions.</p>
          </div>
        )}
        <div className="auth-links">
          <p>Remember your password? <Link to="/login">Login</Link></p>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword 