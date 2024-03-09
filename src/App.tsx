import { onAuthStateChanged } from 'firebase/auth';
import React, { lazy, useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import Loader from './components/Loader';
import ProtectedRoute from './components/ProtectedRoute';
import { auth } from './firebase';
import { getUser } from './redux/api/userApi';
import { userExist, userNotExist } from './redux/reducer/userReducer';
import { RootState } from './redux/store';
import { User } from './types/types';

const Cart = lazy(() => import('./pages/Cart'));
const ProductDetails = lazy(() => import('./pages/ProductDetails'));
const ProductList = lazy(() => import('./pages/ProductList'));
const Categories = lazy(() => import('./pages/Categories'));
const Home = lazy(() => import('./pages/Home'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Login = lazy(() => import('./pages/Login'));
const Profile = lazy(() => import('./pages/Profile'));
const Orders = lazy(() => import('./pages/Orders'));
const Shipping = lazy(() => import('./pages/Shipping'));
const Checkout = lazy(() => import('./pages/Checkout'));

//Admin routes
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const Users = lazy(() => import('./pages/admin/Users'));
const Product = lazy(() => import('./pages/admin/Product'));
const Category = lazy(() => import('./pages/admin/Category'));
const NewProduct = lazy(() => import('./pages/admin/management/NewProduct'));
const UpdateProduct = lazy(() => import('./pages/admin/management/UpdateProduct'));
const NewCategory = lazy(() => import('./pages/admin/management/NewCategory'));
const UpdateCategory = lazy(() => import('./pages/admin/management/UpdateCategory'));

const App = () => {
	const { user, loading } = useSelector((state: RootState) => state.user);
	const [userFetched, setUserFetched] = useState<boolean>(false);
	const dispatch = useDispatch();

	useEffect(() => {
		onAuthStateChanged(auth, async (user) => {
			if (user) {
				const data = (await getUser(user.uid)) as { user: User };
				dispatch(userExist(data.user));
			} else {
				dispatch(userNotExist());
			}
			setUserFetched(true);
		});
	}, []);

	if (!userFetched || loading) {
		return <Loader />;
	}

	return (
		<React.Suspense fallback={<Loader />}>
			<Router>
				<Header />
				<Toaster position='bottom-center' />
				<Routes>
					{/* Common routes */}
					<Route
						path='/'
						element={<Home />}
					/>
					<Route
						path='/404'
						element={<NotFound />}
					/>
					<Route
						path='*'
						element={<NotFound />}
					/>
					<Route
						path='/categories'
						element={<Categories />}
					/>
					<Route
						path='/productlist/:category'
						element={<ProductList />}
					/>
					<Route
						path='/product/:id'
						element={<ProductDetails />}
					/>

					{/* Logged in user routes */}
					<Route element={<ProtectedRoute isAuthenticated={user ? true : false} />}>
						<Route
							path='/cart'
							element={<Cart />}
						/>

						<Route
							path='/profile'
							element={<Profile />}
						/>
						<Route
							path='/orders'
							element={<Orders />}
						/>
						<Route
							path='/shipping'
							element={<Shipping />}
						/>
						<Route
							path='/checkout'
							element={<Checkout />}
						/>
					</Route>

					{/* Not logged in routes */}
					<Route element={<ProtectedRoute isAuthenticated={user ? false : true} />}>
						<Route
							path='/login'
							element={<Login />}
						/>
					</Route>

					{/* Admin routes */}
					<Route
						element={
							<ProtectedRoute
								isAuthenticated={user ? true : false}
								adminOnly={true}
								isAdmin={user?.role === 'admin'}
							/>
						}
					>
						<Route
							path='/admin/dashboard'
							element={<Dashboard />}
						/>
						<Route
							path='/admin/user'
							element={<Users />}
						/>
						<Route
							path='/admin/product'
							element={<Product />}
						/>
						<Route
							path='/admin/product/new'
							element={<NewProduct />}
						/>
						<Route
							path='/admin/product/update/:id'
							element={<UpdateProduct />}
						/>
						<Route
							path='/admin/category'
							element={<Category />}
						/>
						<Route
							path='/admin/category/new'
							element={<NewCategory />}
						/>
						<Route
							path='/admin/category/update/:id'
							element={<UpdateCategory />}
						/>
					</Route>
				</Routes>
				<Footer />
			</Router>
		</React.Suspense>
	);
};
export default App;
