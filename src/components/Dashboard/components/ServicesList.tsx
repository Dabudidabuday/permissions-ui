import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

export const ServicesList = ({ services }: {services: any}) => {
  return (
    <>
    <List>
            {services.map((service: any) => (
              <ListItem key={service.id}>
                <ListItemText primary={service.name} secondary={service.description} />
              </ListItem>
            ))}
          </List>
          </>
  )
}
