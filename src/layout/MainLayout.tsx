import { Box } from "@mui/material";
import { Header } from "../components/Header/Header";

export const MainLayout = ({children}: {children: React.ReactNode}) => {

  return (
    <Box>
     <Header />
      {children}
    </Box>
  );
};
