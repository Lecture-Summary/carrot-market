import React from 'react'
import { FieldErrors, useForm } from 'react-hook-form'

interface LoginForm {
  username: string
  email: string
  password: string
}

export default function Forms() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ mode: 'onChange' })
  const onValid = (data: LoginForm) => {
    console.log('valid')
  }
  const onInValid = (errors: FieldErrors) => {
    console.log(errors)
  }
  return (
    <form onSubmit={handleSubmit(onValid, onInValid)}>
      <input
        {...register('username', {
          required: 'Username is required',
          minLength: {
            value: 5,
            message: 'The username should be longer than 5 chars.',
          },
        })}
        type='text'
        placeholder='Username'
        minLength={5}
      />
      <input
        {...register('email', {
          required: 'Email is required',
          validate: {
            notGmail: (value) =>
              !value.includes('@gmail.com') || 'Gmail is not allowed',
          },
        })}
        type='email'
        placeholder='Email'
        className={`${Boolean(errors.email?.message) && 'border-red-500'}`}
      />
      {errors.email?.message}
      <input
        {...register('password', { required: 'Password is required' })}
        type='password'
        placeholder='Password'
      />
      <input type='submit' value='Create Account' />
    </form>
  )
}
