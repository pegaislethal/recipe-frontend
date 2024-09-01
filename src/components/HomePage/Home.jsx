import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import chef from "../../assets/chef.jpg";
import chef2 from "../../assets/chef2.jpg";
import food from "../../assets/food.jpg";
import food2 from "../../assets/food2.jpg";

const Home = () => {
  return (
    <>
      <Header />
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold text-center mb-6">Welcome to Tastylicious</h1>
        <p className="text-lg text-center mb-10">
          Tastylicious was founded in 2010 in the heart of New York City. We pride ourselves on delivering premium quality culinary experiences. Our dishes are crafted from the finest ingredients, sourced from around the world, to ensure every bite is a memorable one.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div>
            <img src={food} alt="Gourmet Dish 1" className="w-full h-64 object-cover rounded-lg" />
            <h2 className="text-xl font-semibold mt-4">Exquisite Cuisine</h2>
            <p className="text-sm mt-2">
              Our chefs are masters of their craft, dedicated to creating dishes that are not only delicious but also a feast for the eyes.
            </p>
          </div>
          <div>
            <img src={food2} alt="Gourmet Dish 2" className="w-full h-64 object-cover rounded-lg" />
            <h2 className="text-xl font-semibold mt-4">Premium Ingredients</h2>
            <p className="text-sm mt-2">
              We source the highest quality ingredients, ensuring that every dish is made with the best products available.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img src={chef} alt="Chef at Work" className="w-full h-64 object-cover rounded-lg" />
            <h2 className="text-xl font-semibold mt-4">Expert Chefs</h2>
            <p className="text-sm mt-2">
              Our team of skilled chefs brings passion and innovation to the kitchen, delivering an unforgettable dining experience.
            </p>
          </div>
          <div>
            <img src={chef2} alt="Chef Preparing Food" className="w-full h-64 object-cover rounded-lg" />
            <h2 className="text-xl font-semibold mt-4">A Tradition of Excellence</h2>
            <p className="text-sm mt-2">
              Tastylicious has been serving the community with dedication and a commitment to excellence for over a decade.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
