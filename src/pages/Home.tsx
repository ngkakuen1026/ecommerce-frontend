import HeroBanner from "../components/Herobanner";
import SiteFeatures from "../components/SiteFeatures";
import BrowseByCategories from "../components/BrowseByCategories";
import BrowseByProducts from "../components/BrowseByProducts";

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
