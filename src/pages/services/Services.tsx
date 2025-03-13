import { Box, Button, List, ListItem, ListItemText, Paper, Typography } from "@mui/material";
import { api, queryClient } from "../../api/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { WithPermission } from "../../permissions/WithPermission";
import { useState } from "react";
import { ServiceForm } from "../../components/forms/ServiceForm";

export type Service = {
  id: string;
  name: string;
  description: string;
  owner: boolean;
}

export const ServicesPage = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [serviceToEdit, setServiceToEdit] = useState<Service | undefined>(undefined);

  const { data: services } = useQuery<Service[]>({
    queryKey: ['servicesAll'], 
    queryFn: async () => {
      const response = await api.get('/services/all');
      return response.data;
    }
  });

  const { mutate: addService } = useMutation({
    mutationFn: async (newService: Pick<Service, 'name' | 'description'>) => await api.post('/services/create', newService),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['servicesAll']})
    },
    onError: (error) => console.error('cannot create new service', error)
  })

  const { mutate: deleteService } = useMutation({
    mutationFn: async (serviceId: string) => await api.post('/services/delete', {id: serviceId}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['servicesAll']})
    },
    onError: (error) => {
      console.error('cannot Delete service', error);
    }
  })

  const { mutate: editService } = useMutation({
    mutationFn: async (service: Service) => await api.post('services/edit', service),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['servicesAll']})
    },
  })

  const handleEdit = (serviceId: string) => {
    setIsEdit(true);
    setServiceToEdit(services?.find(({ id }) => id == serviceId));
  }

  const handleDelete = (serviceId: string) => {
    deleteService(serviceId);
  }

  return <Box sx={{padding: 4}}>
    <Typography align="center" variant="h2">Services</Typography>

    <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '40px', marginTop: 4 }}>
      <ServiceForm
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        submitFn={isEdit ? editService : addService}
        service={isEdit ? serviceToEdit : undefined}
      />

      <Paper sx={{width: '100%'}}>
        <List>
          {services?.length
            ? services.map((service: Service) => (
              <ListItem key={service.id}>
                <ListItemText primary={service.name} secondary={service.description} />
                <Button variant="outlined" onClick={() => handleEdit(service.id)}>Edit</Button>
                
                <WithPermission resource="services" action="delete" isOwn={service.owner}>
                  <Button variant="outlined" sx={{ ml: 2 }} color="error" onClick={() => handleDelete(service.id)}>Delete</Button>
                </WithPermission> 
              </ListItem>
            ))
            : <Typography sx={{m: 3, textAlign: 'center'}} variant="h5">There are no services yet</Typography>}
        </List>
      </Paper>
    </Box>
  </Box>
}
