const FounderQuote = () => {
  return (
    <div className="max-w-screen-2xl mx-auto flex items-center justify-between py-12 gap-12">
      <div className="flex-1">
        <img
          src="https://img.freepik.com/free-photo/lifestyle-people-emotions-casual-concept-confident-nice-smiling-asian-woman-cross-arms-chest-confident-ready-help-listening-coworkers-taking-part-conversation_1258-59335.jpg"
          alt="Founder's Image"
          className="object-cover w-[24rem] h-[24rem] rounded-lg shadow-lg mx-auto"
        />
      </div>
      <div className="flex-1 pr-10">
        <h1 className="text-4xl font-semibold mb-6">
          A Message from Our Founder
        </h1>
        <blockquote className="text-lg italic text-gray-600 mb-4 tracking-wider font-semibold">
          "At Shoporia, we believe that every product has a story, and every
          story deserves to be told. Our marketplace is more than just a
          platform; it's a celebration of creativity, craftsmanship, and
          community."
        </blockquote>
        <div className="text-gray-600">
          <p className="text-lg mb-4">
            Founded in 2021, our mission is to connect consumers with talented
            artisans and innovative brands from around the globe. We aim to
            revolutionize the shopping experience by celebrating uniqueness and
            diversity.
          </p>
          <p className="text-lg mb-4">
            At Shoporia, you'll find an eclectic mix of products, from
            handcrafted accessories to cutting-edge tech, all curated to inspire
            and delight. We empower small businesses and independent creators,
            supporting local economies and fostering a sense of community.
          </p>
          <p className="text-lg">
            Join us on this journey to make shopping more meaningful. Explore
            our diverse marketplace, where every product tells a story and every
            purchase makes a difference. Welcome to Shoporia—where your choices
            shape a better tomorrow.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FounderQuote;
