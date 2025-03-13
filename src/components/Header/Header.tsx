import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { api } from "../../api/api";

export const Header = () => {
  const navigate = useNavigate();
  const { user, setUser, isLoading } = useContext(AuthContext);

  const handleLogout = async () => {
    await api.post('/auth/logout');
    setUser(null);
    return navigate('/login');
  }

  if(isLoading) return <CircularProgress />

  return <Box sx={{
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    padding: '10px',
    gap: '10px',
  }}>

    {user ? (
      <>
        <Typography variant="h6">{user.name}</Typography>
        <Button variant="contained" onClick={handleLogout}>Logout</Button>
      </>
    ) : (
      <>
        <Typography variant="h6">Please login or signup</Typography>
        <Button variant="contained" onClick={() => navigate('/login')}>Login</Button>
        <Button variant="contained" onClick={() => navigate('/signup')}>Signup</Button>
      </>
    )}
    
  </Box>
}
