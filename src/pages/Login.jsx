import { Box, Button, Paper, Stack } from '@mui/material'
import React, {  useState } from 'react'
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const navgative = useNavigate();

  
  const [ login, setLogin ] = useState({
    username: "",
    password: ""
  });

  const handleLogin = (e)=> {
    const { name, value } = e.target;
    setLogin({...login, [name]: value})
  } 

  const onSubmit = async() => {
    try {
      const res = await axios.post('/v2/admin/signin', login);
      const { token, expired } = res.data;
      // 存取cookie
      document.cookie = `MyToken=${token}; expires=${new Date(expired)};;`

      if(res.data.success){
        navgative('/admin/product');
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Box sx={{  display:'flex', alignItems:'center', justifyContent:'center', width:'100%', height:'100vh'}}>
       <Paper sx={{ width:'300px', height:'350px', padding:'1.2rem', boxShadow:'5px 5px 10px #aaa' }}>

        <Stack sx={{ marginBottom:'2rem' }}>
          <h1>Login</h1>
        </Stack>
           <form>
            <Stack sx={{ margin:'1.2rem 0' }}>
             <TextField
               type='text'
               label='使用者帳號'
               name='username'
               size='small'
               value={login.username}
               onChange={handleLogin}
             />
            </Stack>

            <Stack sx={{ margin:'1.2rem 0' }}>
             <TextField
               type='passwrod'
               label='密碼'
               name='password'
               size='small'
               value={login.password}
               onChange={handleLogin}
             />
            </Stack>

            <Stack sx={{ margin:'2.8rem 0rem' }}>
             <Button variant='contained' onClick={onSubmit}>
               登入
             </Button>
            </Stack>
            
           </form>
       </Paper>
    </Box>
  )
}

export default Login
