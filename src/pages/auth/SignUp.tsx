import { Box, Button, TextField, Typography } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { api } from '../../api/api';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';

interface SignUpForm {
  email: string;
  name: string;
  password: string;
}

export const SignUp = () => {
  const navigate = useNavigate();
  const { setUser, fetchPolicies } = useContext(AuthContext);

  const { handleSubmit, control } = useForm({
    defaultValues: {
      email: '',
      name: '',
      password: '',
    }
  });

  const onSubmit = async (data: SignUpForm) => {
    try {
      const response = await api.post('/auth/signup', data);

      if(response.status === 200) {
        setUser(response.data.user);
        await fetchPolicies();
        
        navigate('/');
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Box>
      <Typography variant="h2" align="center">Sign In to this cool app</Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, justifyContent: 'center', alignItems: 'center', mt: 4 }}>
          <Controller
            control={control}
            name="name"
            render={({ field }) => <TextField {...field} label="Name" />}
          />
          
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

          <Button type="submit" variant="contained" color="primary">Sign In</Button>
        </Box>
      </form>
    </Box>
  )
}
