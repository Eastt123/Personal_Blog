import React from 'react';
import "./login.css";
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { logIn, getUser, getLogInStatus } from '../../features/blogsSlice';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
const Login = () => {
    const dispatch = useDispatch();
    const {register, handleSubmit, formState:{errors}} = useForm();
    const [user, setUser] = useState({email:"", password:""});
    const loggedUser = useSelector(getUser);
    const logInStatus = useSelector(getLogInStatus);
    const location = useLocation();
    const navigate = useNavigate();
    const handleChange = (e) => {
        setUser((user) => {
            return {...user, [e.target.name]:e.target.value}
        })
    };


    const login = (e) => {
        e.preventDefault();
        handleSubmit(()=>{
        dispatch(logIn(user));
        })();
    }

    useEffect(() => {
        if(Object.keys(loggedUser).length > 1){
        navigate("/");
        }
    },[loggedUser])

    
   
    return (
        <section className='login'>
            {/* {loggedUser && <Navigate to="/" />} */}
            <div className="title">
                <h1>Log In</h1>
            </div>
            <form action="">
                <fieldset>
                    <div>
                        <label htmlFor="">Email: </label>
                <input {...register("email", {
                    pattern:{
                        value:/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                        message:"Enter valid email"
                    },
                    required:{
                    value:true,
                    message:"Email is required"
                }, onChange:(e)=>{handleChange(e)}})} type="text" name='email' placeholder='Email' />
                {errors.email ? <p className='error'>{errors.email.message}</p> : null}
                </div>
                <div>
                    <label htmlFor="">Password: </label>
                <input {...register("password", {required:{value:true,
                message:"Password is required"
                }, onChange:(e)=>{handleChange(e)}})} type="password" name='password' placeholder='Password' />
                {errors.password ? <p className='error'>{errors.password.message}</p> : null}
                </div>
                </fieldset>
                <input onClick={(e)=>login(e)} type="submit" value="Log In" />

            </form>
        </section>
    );
};

export default Login;