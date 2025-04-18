import { Box, Card, CardContent, Typography, List, ListItem, ListItemText, Button } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { api } from '../../api/api';
import { useNavigate } from 'react-router';
import { User } from '../../types';
import { WithPermission } from '../../permissions/WithPermission';
import { AuthContext } from '../../context/AuthContext';
import { ServicesList } from './components/ServicesList';

interface Service {
  id: string;
  name: string;
  description: string;
}

export const Dashboard = () => {
  const navigate = useNavigate();
  const { policies } = useContext(AuthContext);
  const [users, setUsers] = useState<User[]>([]);
  const [services, setServices] = useState<Service[]>([]);

  const fetchUsers = async () => {
    const response = await api.get('/users');
    setUsers(response.data);
  };

  const fetchServices = async () => {
    const response = await api.get('/services/all');
    setServices(response.data);
  };

  useEffect(() => {
    fetchUsers();
    fetchServices();
  }, []);

  const prices = [
    { id: 1, name: 'Price 1', description: 'Price 1 description' },
    { id: 2, name: 'Price 2', description: 'Price 2 description' },
    { id: 3, name: 'Price 3', description: 'Price 3 description' },
  ];

  return (
    <>
      <Typography variant="h2" align="center">Permissions App</Typography>
      <Typography variant="h4" align="center" sx={{ mt: 2 }}>
        Welcome to the Permissions App
      </Typography>

      <Box sx={{ display: 'flex', mt: 2, gap: 2 }}>

      <Card sx={{width: '100%'}}>
        <CardContent>
          <Typography variant="h6" align="center">Users</Typography>
          <List>
          {users.map(({ name, email }) => (
            <ListItem key={email}>
              <ListItemText primary={name} secondary={email}/>
              {/* <Typography variant="body2" color="text.secondary">{role || ''}</Typography> */}
            </ListItem>
          ))}
        </List>
        </CardContent>
      </Card>
{/* 
      <Card sx={{width: '100%'}}>
        <CardContent>
          <Typography variant="h6" align="center">Roles</Typography>
          <List>
            {roles?.map((role) => (
              <ListItem key={role.id}>
                <ListItemText primary={role.name} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card> */}

      <Card sx={{width: '100%'}}>
        <CardContent>
          <Typography variant="h6" align="center">Available Policies</Typography>
          <List>
            {policies?.map((policy) => (
              <ListItem key={policy}>
                <ListItemText primary={policy}  />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      <Card sx={{width: '100%'}}>
        <CardContent>
          <Typography variant="h6" align="center">Services</Typography>
          <ServicesList services={services}/>
          
            <Button variant="contained" color="primary" onClick={() => {
              navigate('/services'); 
            }}>
              Go To Services
            </Button> 
        </CardContent>
      </Card>

      <WithPermission resource='prices' action='read'>
        <Card sx={{width: '100%'}}>
          <CardContent>
            <Typography variant="h6" align="center">Prices</Typography>
            <List>
              {prices.map((price) => (
                <ListItem key={price.id}>
                  <ListItemText primary={price.name} secondary={price.description} />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </WithPermission>
    </Box>
  </>
  );
};
