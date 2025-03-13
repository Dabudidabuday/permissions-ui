import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import { Dashboard } from './components/Dashboard/Dashboard';
import { LoginPage } from './pages/auth/Login';
import { SignUp } from './pages/auth/SignUp';
import { AuthProvider } from './context/AuthProvider';
import { ProtectedRoutes } from './components/auth/ProtectedRoutes';
import { MainLayout } from './layout/MainLayout';
import { ServicesPage } from './pages/services/Services';
import {QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './api/api';
import { PermissionsPage } from './pages/PermissionsPage';


function App() {
  const routes = [
    { path: '/login', element: <LoginPage /> },
    { path: '/signup', element: <SignUp /> },
  ];

  const protectedRoutes = [
    { path: '/', element: <Dashboard /> },
    { path: '/services', element: <ServicesPage /> },
    { path: '/permissions', element: <PermissionsPage/> }
  ];

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <MainLayout>
            <Routes>
              {routes.map(({ path, element }) => (
                <Route key={path} path={path} element={element} />
              ))}
              
              {protectedRoutes.map(({ path, element }) => (
                <Route key={path} path={path} element={
                  <ProtectedRoutes>
                    {element}
                  </ProtectedRoutes>
                } />
              ))}
              
            </Routes>
          </MainLayout>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
