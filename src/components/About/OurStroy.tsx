const OurStory = () => {
  return (
    <div className="max-w-screen-2xl mx-auto flex items-center justify-between py-12 gap-12">
      <div className="flex-1">
        <h1 className="text-4xl font-semibold mb-6">Our Story</h1>
        <div className="text-gray-600">
          <p className="text-lg mb-4">
            Welcome to Shoporia, your one-stop marketplace where creativity
            meets community. Founded in 2021, we set out on a mission to
            revolutionize the shopping experience by connecting consumers with
            talented artisans and innovative brands from around the globe.
          </p>
          <p className="text-lg mb-4">
            Our journey began with a simple idea: to create a platform that
            celebrates uniqueness and diversity. At Shoporia, you'll discover an
            eclectic mix of products, from handcrafted accessories to
            cutting-edge tech, all curated to inspire and delight.
          </p>
          <p className="text-lg mb-4">
            We believe in empowering small businesses and independent creators.
            By providing them with a space to showcase their work, we not only
            support local economies but also foster a sense of community. Every
            purchase you make at Shoporia helps sustain these creators and their
            crafts.
          </p>
          <p className="text-lg">
            Join us in our mission to make shopping more meaningful. Explore our
            diverse marketplace, where every product tells a story and every
            purchase makes a difference. Welcome to Shoporia—where your choices
            shape a better tomorrow.
          </p>
        </div>
      </div>
      <div className="flex-1">
        <img
          src="https://www.vistable.com/wp-content/uploads/blog-285-production-line-software-cover-image-1024.jpg"
          alt="Shoporia Products"
          className="w-3/4 h-auto mx-auto rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

export default OurStory;
