import { useEffect, useState } from "react";
import HeroBanner from "../components/About/herobanner";
import authAxios from "../services/authAxios";
import { orderAPI, productAPI, userAPI } from "../services/http-api";
import AboutData from "../components/About/AboutData";
import OurStory from "../components/About/OurStroy";
import TeamIntro from "../components/About/TeamIntro";
import Partnership from "../components/About/Partnership";
import FounderQuote from "../components/About/FounderQuote";
import JoinNow from "../components/About/JoinNow";

const About = () => {
  const [userLength, setUserLength] = useState(0);
  const [orderLength, setOrderLength] = useState(0);
  const [productLength, setProductLength] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await authAxios.get(`${userAPI.url}/user-length`);
        setUserLength(userRes.data.usersLength || 0);

        const orderRes = await authAxios.get(`${orderAPI.url}/order-length`);
        setOrderLength(orderRes.data.ordersLength || 0);

        const productRes = await authAxios.get(`${productAPI.url}`);
        setProductLength(
          productRes.data.products ? productRes.data.products.length : 0
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="">
      <HeroBanner />
      <OurStory />
      <FounderQuote />
      <AboutData
        userLength={userLength}
        orderLength={orderLength}
        productLength={productLength}
      />
      <TeamIntro />
      <Partnership />
      <JoinNow />
    </div>
  );
};

export default About;
