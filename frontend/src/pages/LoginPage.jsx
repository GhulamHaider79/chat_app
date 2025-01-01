import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useAuthStore } from '../store/useAuthStore.js';
import { MessageSquare, User, Mail, Lock, EyeOff, Eye, Loader2 } from 'lucide-react';

import AuthImagePattern from '../components/AuthImagePattern.jsx'

function LoginPage() {

  const [showPassword, setShowPassword] = useState(false);
  const [loginFormData, setLoginFormData] = useState({
    fullName: "",
    email: "",
    password: ""
  });

  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(loginFormData)
  }

  return (
    <div className='min-h-screen grid lg:grid-cols-2'>
      {/* left side */}
      <div className='flex flex-col justify-center items-center p-6 sm:p-12'>
        <div className='w-full max-w-md space-y-6 pt-4'>
          {/* LOGO  */}
          <div className='text-center mb-8'>
            <div className='flex flex-col items-center gap-2 group'>
              <div
                className='size-12 rounded-xl bg-primary/10 flex flex-col items-center justify-center group-hover:bg-primary/20 transition-colors'
              >
                <MessageSquare className='size-6 text-primary' />
              </div>
              <div>
                <h1 className='text-2xl font-bold mt-2'> Create Account </h1>
                <p className='text-base-content/60 w-full'>Get started with your free account</p>
              </div>

            </div>

          </div>

          {/* form */}
          <form onSubmit={handleSubmit} className='space-y-6'>

            {/* email input */}
            <div className='form-control'>
              <label className='label'>
                <span className='label-text font-medium'>Email</span>
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <Mail className='size-5 text-base-content/40' />
                </div>
                <input
                  type="email"
                  className={`input input-bordered w-full pl-10`}
                  placeholder='haider@gmail.com'
                  value={loginFormData.email}
                  onChange={(e) => setLoginFormData({ ...loginFormData, email: e.target.value })}
                />
              </div>

            </div>
            {/* password input */}
            <div className='form-control'>
              <label className='label'>
                <span className='label-text font-medium'>Password</span>
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <Lock className='size-5 text-base-content/40' />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`input input-bordered w-full pl-10`}
                  placeholder='•••••••'
                  value={loginFormData.password}
                  onChange={(e) => setLoginFormData({ ...loginFormData, password: e.target.value })}
                />

                <button
                  className='absolute inset-y-0 right-0 pr-3 items-center'
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className='size-5 text-base-content/40' />
                  ) : (
                    <Eye className='size-5 text-base-content/40' />
                  )

                  }

                </button>
              </div>

            </div>

            <button type='submit' className='btn btn-primary w-full' disabled={isLoggingIn} >
              {isLoggingIn ? (
                <>
                  <Loader2 className='size-5 animate-spin' />
                  Loading...
                </>
              ) : (
                "Login"
              )
              }

            </button>

          </form>

          <div className='text-center'>
            <p className='text-base-content/60'>
              If you have not account?{""}
              <Link to="/signup" className='link link-primary' >
                Sign up
              </Link>
            </p>

          </div>

        </div>

      </div>

      {/* Right Side */}

      <AuthImagePattern
        title="Join our community"
        subtitle="connect with friends, share moments, and stay in touch with your loved one"
      />

    </div>
  )
}

export default LoginPage