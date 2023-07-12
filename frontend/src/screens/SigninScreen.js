import React, { useContext, useEffect, useState } from 'react';
import Axios from 'axios';

import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { Store } from './../context/Store';
import { toast } from 'react-toastify';
import { getError } from '../utils';

const SigninScreen = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await Axios.post('/api/users/signin', {
        email,
        password,
      });
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      // console.log(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate(redirect || '/');
    } catch (err) {
      toast.error(getError(err));
      // toast.error('Invalid email or password');
      // alert('Invalid email or password');
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <>
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <section className="amazon-sign-card">
        <h1 className="my-3">Sign In</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label className="label">Email</Form.Label>
            <Form.Control
              className="control"
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label className="label">Password</Form.Label>
            <Form.Control
              className="control"
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <div className="mb-3">
            <Button className="amazon-button" type="submit">
              Sign In
            </Button>
          </div>
          <div className="mb-3">
            New customer?{' '}
            <Link to={'/signup?redirect=${redirect}'}>
              {' '}
              <button type="button" className="newacc btn btn-sm btn-light">
                {' '}
                create new account
              </button>
            </Link>
          </div>
        </Form>
      </section>
    </>
  );
};

export default SigninScreen;
