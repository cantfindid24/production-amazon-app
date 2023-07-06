import { BrowserRouter, Link, Route, redirect, Routes } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Badge from 'react-bootstrap/Badge';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import { useContext, useEffect, useState } from 'react';
import { Store } from './context/Store';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SignupScreen from './screens/SignupScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import Button from 'react-bootstrap/esm/Button';
import { getError } from './utils';
import axios from 'axios';
import SearchBox from './components/SearchBox';
import SearchScreen from './screens/SearchScreen';
import logo from './image-folder/logo/logo1.png';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import DashboardScreen from './screens/DashboardScreen';

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/signin';
  };
  const [sidebarisopen, setSidebarisopen] = useState(false);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products/categories`);
        setCategories(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, []);
  return (
    <BrowserRouter>
      <div className={'d-flex flex-column site-container'}>
        <ToastContainer position="bottom-center" limit={1} />

        {/* -------Navbar------- */}

        <header>
          <Navbar
            bg="dark"
            variant="dark"
            className="navbar"
            style={{ opacity: '1', zIndex: '2500' }}
          >
            <nav className="nav-hold">
              <nav className="nav-left">
                <Button
                  className="me-2"
                  variant="dark"
                  onClick={() => {
                    setSidebarisopen(!sidebarisopen);
                  }}
                >
                  {' '}
                  <i className="fas fa-bars bars-icon"></i>{' '}
                </Button>
                <LinkContainer to="/" className="me-2">
                  <Navbar.Brand>
                    <div className="amazon-logo">
                      <img src={logo} alt="amazon" />
                      <span>.in</span>
                    </div>
                  </Navbar.Brand>
                </LinkContainer>
              </nav>

              <nav className="nav-middle">
                <SearchBox />
                <Link to="/cart" className="nav-link">
                  <i className="fa fa-shopping-cart text-white cart-icon"></i>
                  {cart.cartItems.length > 0 && (
                    <Badge pill bg="danger">
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </Badge>
                  )}
                </Link>
              </nav>
            </nav>
            <Nav className="me -auto nav-right">
              {userInfo ? (
                <NavDropdown
                  title={userInfo.name}
                  className="basic-nav-dropdown"
                  id="basic-nav-dropdown"
                >
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>User Profile</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/orderhistory">
                    <NavDropdown.Item>Order History</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Divider />
                  <Link
                    className="dropdown-item"
                    to="#signout"
                    onClick={signoutHandler}
                  >
                    Sign Out
                  </Link>
                </NavDropdown>
              ) : (
                <Link className="nav-link" to="/signin">
                  Sign In
                </Link>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown
                  title="Admin"
                  id="admin-nav-dropdown"
                  className="admin-nav-dropdown"
                >
                  <LinkContainer to="/admin/dashboard">
                    <NavDropdown.Item>Dashboard</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar>
        </header>
        {/* -------Sidebar------- */}
        <div
          className={
            sidebarisopen
              ? 'active-nav sidebar-container d-flex justify-content-between flex-wrap flex-column'
              : 'sidebar-container d-flex justify-content-between flex-wrap flex-column'
          }
        >
          <div
            className={
              sidebarisopen
                ? 'flex-column sidebar-activ sidebar '
                : 'flex-column sidebar'
            }
          >
            <div className="w-100 d-flex hmenu-customer-profile">
              <div className="hmenu-customer-profile-left  d-flex me-2">
                <div className="hmenu-avatar-icon d-flex">
                  <i className="fas fa-solid fa-circle-user text-white"></i>
                </div>
              </div>
              <div className="d-flex hmenu-customer-profile-right w-100">
                <b>
                  Hello,{'  '}
                  {userInfo ? (
                    userInfo.name
                  ) : (
                    <Link
                      onClick={() => setSidebarisopen(false)}
                      className="ms-2 text-white"
                      to={`/signin?redirect=${redirect}`}
                    >
                      sign in
                    </Link>
                  )}
                </b>
              </div>
              <div className="d-flex">
                <button
                  onClick={() => setSidebarisopen(false)}
                  className="btn closeBtn text-white "
                >
                  <i className="fas fa-thin fa-xmark"></i>
                </button>
              </div>
            </div>
            <div className="sidebar-content-wrap">
              <div className="sidebar-content">
                <h2 className="sidebar-content-title">Categories</h2>
                {categories.map((category) => (
                  <p key={category} className="sidebar-content-para">
                    <LinkContainer
                      to={{
                        pathname: '/search',
                        search: `?category=${category}`,
                      }}
                      // to={`/search/category=${category}`}
                      onClick={() => setSidebarisopen(false)}
                    >
                      <Nav.Link>{category}</Nav.Link>
                    </LinkContainer>
                  </p>
                ))}
              </div>
              <div className="sidebar-content">
                <h2 className="sidebar-content-title">Categories</h2>
                {categories.map((category) => (
                  <p key={category} className="sidebar-content-para">
                    <LinkContainer
                      to={{
                        pathname: '/search',
                        search: `?category=${category}`,
                      }}
                      // to={`/search/category=${category}`}
                      onClick={() => setSidebarisopen(false)}
                    >
                      <Nav.Link>{category}</Nav.Link>
                    </LinkContainer>
                  </p>
                ))}
              </div>
              <div className="sidebar-content">
                <h2 className="sidebar-content-title">Categories</h2>
                {categories.map((category) => (
                  <p key={category} className="sidebar-content-para">
                    <LinkContainer
                      to={{
                        pathname: '/search',
                        search: `?category=${category}`,
                      }}
                      // to={`/search/category=${category}`}
                      onClick={() => setSidebarisopen(false)}
                    >
                      <Nav.Link>{category}</Nav.Link>
                    </LinkContainer>
                  </p>
                ))}
              </div>
              <div className="sidebar-content">
                <h2 className="sidebar-content-title">Categories</h2>
                {categories.map((category) => (
                  <p key={category} className="sidebar-content-para">
                    <LinkContainer
                      to={{
                        pathname: '/search',
                        search: `?category=${category}`,
                      }}
                      // to={`/search/category=${category}`}
                      onClick={() => setSidebarisopen(false)}
                    >
                      <Nav.Link>{category}</Nav.Link>
                    </LinkContainer>
                  </p>
                ))}
              </div>
              <div className="sidebar-content">
                <h2 className="sidebar-content-title">Categories</h2>
                {categories.map((category) => (
                  <p key={category} className="sidebar-content-para">
                    <LinkContainer
                      to={{
                        pathname: '/search',
                        search: `?category=${category}`,
                      }}
                      // to={`/search/category=${category}`}
                      onClick={() => setSidebarisopen(false)}
                    >
                      <Nav.Link>{category}</Nav.Link>
                    </LinkContainer>
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* -------Main------- */}

        <main>
          <Container className="mt-3">
            <Routes>
              {/* -------Admin Routes------- */}

              <Route
                path="/admin/dashboard"
                element={
                  <AdminRoute>
                    <DashboardScreen />
                  </AdminRoute>
                }
              />

              {/* <Route
                path="/admin/productlist"
                element={
                  <AdminRoute>
                    <ProductListScreen />
                  </AdminRoute>
                }
              />

              <Route
                path="/admin/orderlist"
                element={
                  <AdminRoute>
                    <OrderListScreen />
                  </AdminRoute>
                }
              />

              <Route
                path="/admin/product/:id"
                element={
                  <AdminRoute>
                    <ProductEditScreen />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/user/:id"
                element={
                  <AdminRoute>
                    <UserEditScreen />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/userlist"
                element={
                  <AdminRoute>
                    <UserListScreen />
                  </AdminRoute>
                }
              /> */}

              {/* -------admin------- */}

              <Route path="/product/:_id" element={<ProductScreen />}></Route>
              <Route
                path="/orders/:id"
                element={
                  <ProtectedRoute>
                    <OrderScreen />
                  </ProtectedRoute>
                }
              />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/search" element={<SearchScreen />} />
              <Route path="/signin" element={<SigninScreen />} />
              <Route path="/signup" element={<SignupScreen />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfileScreen />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/orderhistory"
                element={
                  <ProtectedRoute>
                    <OrderHistoryScreen />
                  </ProtectedRoute>
                }
              />
              <Route path="/shipping" element={<ShippingAddressScreen />} />
              <Route path="/placeorder" element={<PlaceOrderScreen />} />
              <Route path="/payment" element={<PaymentMethodScreen />} />
              <Route path="/" element={<HomeScreen />} />
            </Routes>
          </Container>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

// http://localhost:3000/search/category=all&query=all&price=all&rating=all&order=newest&page=1
