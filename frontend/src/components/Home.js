import React from 'react';
import Navbar from './Navbar';
import Carousel from './Carousel';
import Dashboard from './Dashboard';

function Home() {
  return (
    <>
        <Navbar/>
        <Carousel/>
        <Dashboard/>
    </>
  );
}

export default Home;