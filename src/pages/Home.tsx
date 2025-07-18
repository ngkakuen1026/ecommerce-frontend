import BrowseByCategories from "../components/Home/BrowseByCategories";
import BrowseByProducts from "../components/Home/BrowseByProducts";
import HeroBanner from "../components/Home/Herobanner";
import SiteFeatures from "../components/Home/SiteFeatures";

const Home = () => {
  return (
    <>
      <HeroBanner />
      <SiteFeatures />
      <BrowseByCategories />
      <BrowseByProducts />
    </>
  );
};

export default Home;
