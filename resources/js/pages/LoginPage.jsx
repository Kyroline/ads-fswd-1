import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import InputBox from '../components/form/InputBox'
import Button from '../components/form/Button'
// import InputText from '../../components/Form/InputText'
// import Button from '../../components/Form/Button'

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
}

const LoginPage = () => {
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    // const alert = useAlert()

    let isActive = validateEmail(email) && (password != '' && password != null)
    console.log(isActive)

    const submitLogin = async (e) => {
        e.preventDefault()
        if (loading)
            return

        setLoading(true)
        try {
            let response = await axios.post(`/api/auth/login`, {
                email: email,
                password: password
            })
            // alert.success('Login succeess')
            sessionStorage.setItem('api_key', response.data.access_token)
            // setUser(response.data.user)
            navigate('/')
        } catch (error) {
            // alert.error('Email or password is incorrect.')
        }
        setLoading(false)
    }

    return (
        <section className="bg-[#ebebeb]">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow-2xl md:mt-0 sm:max-w-md xl:p-0">
                    <form onSubmit={submitLogin} className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Log in to your account
                        </h1>
                        <InputBox
                            required={true}
                            value={email}
                            type='email'
                            onChange={e => setEmail(e.target.value)}
                            label='Email'
                            placeholder='youremail@mail.com' />
                        <InputBox
                            required={true}
                            value={password}
                            type='password'
                            onChange={e => setPassword(e.target.value)}
                            label='Password'
                            placeholder='••••••••' />
                        <Button disabled={!isActive || loading} >Sign in</Button>
                        <p className="text-sm font-light text-gray-500">
                            Don't have an account yet? <Link to='/register'><span className="font-medium text-primary hover:underline">Register</span></Link>
                        </p>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default LoginPage