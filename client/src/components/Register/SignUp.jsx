import React, {useState} from 'react';
import { useForm } from 'react-hook-form';
import "./signup.css";
import { useDispatch } from 'react-redux';
import { registerUser } from '../../features/blogsSlice';
const SignUp = () => {
    const {register, handleSubmit, formState:{errors}} = useForm();
    const dispatch = useDispatch();
    const [user, setUser] = useState({
        name:'',
        surename:'',
        email:'',
        password:'',
        confirmPassword:''
    });

    const userData = (e) => {
        setUser((prev) => {
            return {...prev, [e.target.name]:e.target.value}
        });
    }

    const submit = (e) => {
        e.preventDefault();
        handleSubmit(()=>{
            dispatch(registerUser(user));
        })();
    }

    const {name, surename, email, password, confirmPassword} = user;
    return (
        <section className='signup'>
            <div className="heading">
                <h1>Sign Up</h1>
            </div>
            <form  >
                <div>
                    <label className='title' htmlFor="">Name:</label>
                    <input
                    value={name}
                    type="text"
                    placeholder='Name'
                    name="name"
                    id="name"
                    {...register("name",{required:{value:true, message:"Name is required"},
                        onChange:(e)=>{userData(e)}})}
                    />
                    <div>
                        {errors.name ? <p class="error">{errors.name.message}</p> : null}
                    </div>
                </div>
                <div>
                    <label className='title' htmlFor="">Surename:</label>
                    <input
                    value={surename}
                    type="text"
                    placeholder='Surename'
                    name="surename"
                    id="surename"
                    {...register("surename",{required:{value:true, message:"Surename is required"},
                        onChange:(e)=>{userData(e)}})}
                    />
                    <div>
                        {errors.surename ? <p class="error">{errors.surename.message}</p> : null}
                    </div>
                </div>

                <div>
                    <label className='title' htmlFor="">Email:</label>
                    <input
                    value={email}
                    type="text"
                    placeholder='Email'
                    name="Email"
                    id="Email"
                    {...register("email",{required:{value:true, message:"Email is required"},
                        onChange:(e)=>{userData(e)}})}
                    />
                    <div>
                        {errors.email ? <p class="error">{errors.email.message}</p> : null}
                    </div>
                </div>
                <div>
                    <label className='title' htmlFor="">Password:</label>
                    <input
                    value={password}
                    type="text"
                    placeholder='Password'
                    name="Password"
                    id="password"
                    {...register("password",{required:{value:true, message:"Password is required"},
                        onChange:(e)=>{userData(e)}})}
                    />
                    <div>
                        {errors.password ? <p class="error">{errors.password.message}</p> : null}
                    </div>
                </div>
                <div>
                    <label className='title' htmlFor="">Confirm Password:</label>
                    <input
                    value={confirmPassword}
                    type="text"
                    placeholder='Confirm Password'
                    name="ConfirmPassword"
                    id="confirmPassword"
                    {...register("confirmPassword",{
                        onChange:(e)=>{userData(e)},
                        validate: {
                           confirmPassword: value => value === password || "Password does not match"
                        }

                    })}
                    />
                    <div>
                        {errors.confirmPassword ? <p class="error">{errors.confirmPassword.message}</p> : null}
                    </div>
                </div>

                <button onClick={(e)=>submit(e)} type='submit'>Sign-Up</button>
                <a href="/login">Already have account?</a>

            </form>

        </section>
    );
};

export default SignUp;