import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore.js'
import { MessageSquare, User, Mail, Lock, EyeOff, Eye, Loader2 } from 'lucide-react'
import AuthImagePattern from '../components/AuthImagePattern.jsx'
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

function SignUpPage() {

  const [ showPassword, setShowPassword ] = useState(false);
  const [ signupFormData, setSignupFormData ] = useState({
    fullName: "",
    email: "",
    password: ""
  });

  const { signup, isSigningUp} = useAuthStore();

  const validateForm = () => {
      if (!signupFormData.fullName.trim()) return toast.error("Full name is required");
      if (!signupFormData.email.trim()) return toast.error("email required");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupFormData.email)) return toast.error("invalid email format");
      // if (!signupFormData.password.length < 6) return toast.error("Password must be at least 6 characters ");

      
        if (signupFormData.password.length < 6) {
          return toast.error("Password must be at least 6 characters");
        }
      
        const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;
        if (!specialCharacterRegex.test(signupFormData.password)) {
          return toast.error("Password must contain at least one special character");
        }

        return true;
  }

  const handleSubmit = (e) => {
    e.preventDefault()

   const validateSuccess = validateForm();

   if (validateSuccess === true) signup(signupFormData)

  }


  return (
    <div className='min-h-screen grid lg:grid-cols-2 pt-10'>
     {/* left side */}
     <div className='flex flex-col justify-center items-center p-6 sm:p-12'>
      <div className='w-full max-w-md space-y-6'>
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
        {/* full name input */}
          <div className='form-control'>
            <label className='label'>
              <span className='label-text font-medium'>Full Name</span>
            </label>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
               <User className='size-5 text-base-content/40' />
              </div>
                 <input 
                 type="text" 
                 className={`input input-bordered w-full pl-10`}
                 placeholder='Haider'
                 value={signupFormData.fullName}
                 onChange={ (e) => setSignupFormData({ ...signupFormData, fullName: e.target.value })}
                 />
            </div>

          </div>
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
                 value={signupFormData.email}
                 onChange={ (e) => setSignupFormData({ ...signupFormData, email: e.target.value })}
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
                 type={ showPassword ? "text" : "password"}
                 className={`input input-bordered w-full pl-10`}
                 placeholder='•••••••'
                 value={signupFormData.password}
                 onChange={ (e) => setSignupFormData({ ...signupFormData, password: e.target.value })}
                 />

                 <button
                 className='absolute inset-y-0 right-0 pr-3 items-center'
                 type='button'
                 onClick={() => setShowPassword(!showPassword)}
                 >
                  { showPassword ? (
                      <EyeOff className='size-5 text-base-content/40' />
                  ) : (
                    <Eye className='size-5 text-base-content/40' />
                  )
                      
                  }

                 </button>
            </div>

          </div>

          <button type='submit' className='btn btn-primary w-full' disabled={isSigningUp} >
            { isSigningUp ? (
              <>
              <Loader2 className='size-5 animate-spin' />
              Loading...
              </>
            ) : (
             "Create Account"
            )
            }

          </button>

        </form>

        <div className='text-center'>
          <p className='text-base-content/60'>
            Already have an account?{""}
            <Link to="/login" className='link link-primary' >
            Sign in
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

export default SignUpPage