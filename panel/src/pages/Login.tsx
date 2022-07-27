import React, { useState } from 'react';
import useMain from "@hooks/useMain";

export default function Login() {
  const { setIsLogin, setUserInfos } = useMain();

  const [showPassword, setShowPassword] = useState(false);

  const [loginInfos, setLoginInfos] = useState({
    username: '',
    password: ''
  });

  const tryLogin = () => {
    if(loginInfos.username !== '' && loginInfos.password !== '') {
      setIsLogin(true);
      setUserInfos({
        avatar: "https://cdn.discordapp.com/attachments/584738120738537483/990766575965597746/Group_2_2.png",
        username: loginInfos.username,
        role: 'Admin'
      });
    }
  }

  return (
    <div className="bg-base-gray page flex flex-1 items-center justify-center select-none">
      <div className='bg-white rounded-lg p-6'>
        <div className="flex items-center">
          <div className="text-md font-semibold mr-4">Login</div>
        </div>

        <div className="flex flex-col mt-4">
          <label htmlFor="key" className="text-xs font-semibold mb-2">Username</label>
          <input 
            className='rounded-lg border-[1px] border-base-gray p-2' type="text" name="key"
            defaultValue={loginInfos.username} 
            onChange={(e) => setLoginInfos(user => { return { username: e.target.value, password: user.password }}) } />

          <label htmlFor="key" className="text-xs font-semibold mt-4 mb-2">Password</label>
          <div className="flex items-center border-[1px] border-base-gray rounded-lg overflow-hidden">
            <input 
              type={showPassword ? 'text' : 'password'}
              className='p-2' name="key"
              defaultValue={loginInfos.password} 
              onChange={(e) => setLoginInfos(user => { return { username: user.username, password: e.target.value }}) }/>

            <div className="ml-1 mr-2 text-gray-600 hover:text-gray-800 cursor-pointer" onClick={() => setShowPassword(value => !value)}>
              {
                showPassword ?
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg> :
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              }
            </div>
          </div>
          
          <div onClick={() => {tryLogin()}} className="bg-base-color hover:bg-base-dark text-white rounded-lg mt-4 py-2 text-center cursor-pointer">
            Login
          </div>
        </div>
      </div>
    </div>
  )
}
