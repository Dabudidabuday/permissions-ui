import { useContext } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { api } from '../../api/api';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../context/AuthContext';
import { Navigate } from 'react-router';

interface LoginFormData {
  email: string;
  password: string;
}

export const LoginPage = () => {
  const navigate = useNavigate();
  const { setUser, fetchPolicies, user } = useContext(AuthContext);

  const { handleSubmit, control } = useForm({
    defaultValues: {
      email: '',
      password: '',
    }
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await api.post('/auth/login', data, { withCredentials: true });
      
      setUser(response.data);
      await fetchPolicies();
  
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }

  if(user) return <Navigate to="/" />

  return (
    <Box>
      <Typography variant="h2" align="center">Login</Typography>
      <Typography variant="h4" align="center" sx={{ mt: 2 }}>
        Login to your account in order to check how this is cool
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, justifyContent: 'center', alignItems: 'center', mt: 4 }}>
          <Controller
            control={control}
            name="email"
            render={({ field }) => <TextField {...field} label="Email" />}
          />

          <Controller
            control={control}
            name="password"
            render={({ field }) => <TextField {...field} label="Password" type="password" />}
          />

          <Button type="submit" variant="contained" color="primary">Login</Button>
        </Box>
      </form>
    </Box>
  )
}
