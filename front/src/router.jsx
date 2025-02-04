import {createBrowserRouter} from 'react-router-dom';
import Products from './views/products';
import ProductForm from './views/ProductForm';
import Login from './views/Login';
import Register from './views/register';

const router =  createBrowserRouter ([
                {
                    path :'/products' , element :<Products/>
                },
                {
                    path: '/products/new',
                    element: <ProductForm key="userCreate"/>
                },
                {
                    path: '/products/:id',
                    element: <ProductForm key="userUpdate" />
                },
                
                {
                    path: '/login',
                    element: <Login />,
                },
                {
                    path: '/register',
                    element:  <Register />,
                }
    ]);

export default router;