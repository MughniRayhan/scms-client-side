import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { Link, useLocation, useNavigate } from 'react-router';
import UseAuth from '../../../Hooks/UseAuth';
import { toast } from 'react-toastify';
import SocialLogin from '../SocialLogin/SocialLogin';
function Register() {
        const {register, handleSubmit, formState: { errors }} = useForm();
        const {createUser,updateUserProfile} = UseAuth();
        const location = useLocation();
        const navigate = useNavigate();

        const [profile,setProfile] = useState('');
        const [name,setName] = useState('');
        
const onSubmit = (data) => {
  createUser(data.email, data.password)
    .then(async(result) => {
      setName(data.name)
      // update userInfo in database
      

   
      // update user profile in firebase
      // const userProfile = {
      //   displayName: data.name,
      //   photoURL: profile,
      // };

      // updateUserProfile(userProfile)
      //   .then(() => {
      //   })
      //   .catch((error) => {
      //   });
        toast.success("Successfully registered")
        navigate('/')
    })
    .catch((error) => {
      console.error(error.message);
    });
};

        
  return (
        <div className=' my-10 sm:w-[70%] mx-auto w-full shadow-lg md:shadow-none'>
        <form onSubmit={handleSubmit(onSubmit)} className='card-body'>
           <div className='mb-2'>
             <h2 className='font-extrabold sm:text-3xl text-xl mb-1 text-accent'>Create an Account</h2>
            
           </div>

           
        <fieldset className="fieldset">
          {/* image */}
            {/* <input type="file"
          // onChange={handleUploadImage} 
          className="file-input" placeholder="" /> */}

          {/* name */}
          <label className="label">Name</label>
          <input type="text"  
          {...register("name",{ required: true})} 
          className="input" placeholder="Name" />
          {
            errors.name?.type === 'required' && <span className='text-red-500'>Name is required</span>
          }
           {/* email */}
          <label className="label">Email</label>
          <input type="email"  
          {...register("email",{ required: true})} 
          className="input" placeholder="Email" />
          {
            errors.email?.type === 'required' && <span className='text-red-500'>Email is required</span>
          }
           {/* password */}
          <label className="label">Password</label>
          <input type="password"  
          {...register("password",{ required: true, minLength: 6 })} 
          className="input" placeholder="Password" />
          {
            errors.password?.type === 'required' && <span className='text-red-500'>Password is required</span>
          }
          {
            errors.password?.type === 'minLength' && <span className='text-red-500'>Must have to 6 length</span>
          }
         
          <button className="btn btn-neutral mt-4 sm:w-[330px] bg-primary  font-bold border-none">Register</button>
          <div className='mt-2 text-base'>Allready have an account?    <Link to='/login' className='text-secondary font-semibold underline'>   Login</Link></div>
         <SocialLogin />
        </fieldset>
          
    </form>
    </div>
  )

}
export default Register