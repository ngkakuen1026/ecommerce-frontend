const HeroBanner = () => {
  return (
    <section className="herobanner-bg bg-gradient-to-r from-cyan-200 to-cyan-400 py-20 px-8">
      <div className="x-auto flex flex-col-reverse md:flex-row items-center">
        <div className="flex-1">
          <img
            src="../src/assets/aboutusherobanner.png"
            alt="Hero Banner"
            className="w-1/2 h-auto mx-auto rounded-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
