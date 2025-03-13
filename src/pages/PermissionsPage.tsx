import { Box, List, ListItem } from "@mui/material"
import { WithPermission } from "../permissions/WithPermission"
import { useQuery } from "@tanstack/react-query"
import { api } from "../api/api"

export const PermissionsPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['allPermissions'],
    queryFn: async () => await api.get('/permissions'), 
  })


  return (
    <WithPermission resource="permissions" action="read">
      <Box>
        <List>

          <ListItem/>
        </List>
      </Box>
    </WithPermission>
  )
}
