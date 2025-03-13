import { Box, Typography, TextField, Button } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { Service } from "../../pages/services/Services";
import { useEffect } from "react";

interface ServiceFormProps<T> {
  isEdit: boolean;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  submitFn: any;
  service: T | undefined;
}

export const ServiceForm = ({ isEdit, submitFn, setIsEdit, service }: ServiceFormProps<Service>): React.ReactNode => {
  const { control, handleSubmit, setValue, } = useForm({
    defaultValues: {
      name: '',
      description: '',
    }
  });

  useEffect(() => {
    if(isEdit && service) {
      const { name, description } = service;

      setValue('name', name);
      setValue('description', description);
    }
  }, [isEdit, service, setValue]);

  const onSubmit = (data: Pick<Service, 'name' | 'description'>) => {
    const serviceData = isEdit ? {...data, id: service?.id} : data

    submitFn(serviceData);

    setIsEdit(false);
    setValue('name', '');
    setValue('description', '');
  };

  const handleCancel = () => {
    setIsEdit(false);
    setValue('name', '');
    setValue('description', '');
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '80%' }}>
      <Typography variant="h4">{isEdit ? 'Edit' : 'Add'} Service</Typography>
      <Controller
        control={control}
        name="name"
        render={({ field }) => <TextField label="Name" {...field} />}
      />
      <Controller
        control={control}
        name="description"
        render={({ field }) => <TextField label="Description" {...field} />}
      />
      <Box sx={{ display: 'flex', width: '100%', justifyContent: 'flex-end', gap: 2 }}>
        {isEdit && <Button variant="outlined" onClick={handleCancel}>Cancel</Button>}
        <Button sx={{}} variant="contained" onClick={handleSubmit(onSubmit)}>{isEdit ? 'Save' : 'Add'}</Button>
      </Box>
    </Box>
  )
}
