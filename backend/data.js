import bcrypt from 'bcryptjs';
const data = {
  users: [
    {
      name: 'Ankit',
      email: 'admin@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: true,
    },
    {
      name: 'Bill',
      email: 'user@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
    },
  ],
  products: [
    {
      // _id: '1',
      name: 'Nike Slim Shirt',
      slug: 'nike-slim-shirt',
      category: 'Shirts',
      image: '/images/p1.jpg',
      price: 125,
      countInStock: 10,
      brand: 'Nike',
      rating: 4.5,
      numReviews: 10,
      description: 'high quality product',
    },
    {
      // _id: '2',
      name: 'Levis Denim',
      slug: 'levis-denim',
      category: 'Pant',
      image: '/images/p2.jpg',
      price: 48,
      countInStock: 7,
      brand: 'levis',
      rating: 4.7,
      numReviews: 23,
      description: 'high stretch product',
    },
    {
      // _id: '3',
      name: 'lee brill Pant',
      slug: 'lee-brill-pant',
      category: 'Pant',
      image: '/images/p3.jpg',
      price: 267,
      countInStock: 7,
      brand: 'lee cooper',
      rating: 4.6,
      numReviews: 10,
      description: 'high quality product',
    },
    {
      // _id: '4',
      name: 'Raymond Formal Shirt',
      slug: 'raymond-formal-shirt',
      category: 'Shirts',
      image: '/images/p4.jpg',
      price: 3,
      countInStock: 3,
      brand: 'Raymond',
      rating: 4.8,
      numReviews: 17,
      description: 'high quality product',
    },
    {
      // _id: '5',
      name: 'Polo Round Shirt',
      slug: 'polo-round-shirt',
      category: 'Shirts',
      image: '/images/p5.jpg',
      price: 70,
      countInStock: 0,
      brand: 'Polo',
      rating: 4.2,
      numReviews: 11,
      description: 'high quality product',
    },
    {
      // _id: '6',
      name: 'Adidas Jogger Pant',
      slug: 'adidas-jogger-pant',
      category: 'Pant',
      image: '/images/p6.jpg',
      price: 700,
      countInStock: 2,
      brand: 'Adidas',
      rating: 4.9,
      numReviews: 5,
      description: 'high quality product',
    },
    {
      // _id: '7',
      name: 'Firebolt smart watch',
      slug: 'firebolt-smart-watch',
      category: 'watches',
      image: '/images/watch1.jpg',
      price: 1000,
      countInStock: 25,
      brand: 'Firebolt',
      rating: 5,
      numReviews: 34,
      description: 'high quality watch ',
    },
    {
      // _id: '8',
      name: 'Pearl Jhumka',
      slug: 'peral-jhumki-jhumki-earing',
      category: 'Jwellery',
      image: '/images/j1.jpg',
      price: 1500,
      countInStock: 25,
      brand: 'Pearl',
      rating: 5,
      numReviews: 3,
      description: 'High class Earings ',
    },
  ],
};

export default data;