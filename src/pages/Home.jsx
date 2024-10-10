import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="relative flex items-center justify-center h-screen bg-cover bg-center" 
      style={{ backgroundImage: `url('/public/home.jpg')` }}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      
      <div className="relative z-10 text-center text-white">
        <h1 className="text-4xl font-bold md:text-6xl lg:text-7xl">
          Create your professional CV effortlessly and showcase it to the world!
        </h1>
        <p className="mt-4 text-lg md:text-xl">
          Design your resume in just a few clicks and let employers or peers view and download it instantly.
        </p>
        
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link to='/allcvs'>
            <Button size="lg" className="w-full sm:w-auto">
              See CV's
            </Button>
          </Link>
          <Link to='/login'>
            <Button size="lg" variant="secondary" className="w-full sm:w-auto">
              Login
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Home;
