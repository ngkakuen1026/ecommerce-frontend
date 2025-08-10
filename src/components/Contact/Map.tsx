import { GoogleMap, Marker } from "@react-google-maps/api";
import { useEffect, useState } from "react";

const Map = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  const mapContainerStyle = {
    width: "100%",
    height: "400px",
  };

  const center = {
    lat: 22.286,
    lng: 114.1581,
  };

  useEffect(() => {
    const loadMapScript = () => {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${
        import.meta.env.VITE_GOOGLE_MAPS_API_KEY
      }&language=en`;
      script.onload = () => setIsLoaded(true);
      document.body.appendChild(script);
    };
    loadMapScript();
  }, []);

  return (
    <div className="max-w-screen-2xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-semibold text-center mb-6">Our Location</h1>
      <div className="flex flex-col md:flex-row gap-6">
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={16}
          >
            <Marker position={center} />
          </GoogleMap>
        ) : (
          <div>Loading Map...</div>
        )}

        <div className="text-lg text-gray-600">
          <p>
            Our shop is located at the heart of the city, easily accessible by
            public transport and with ample parking available. We pride
            ourselves on being a community hub where you can find quality
            products and friendly service.
          </p>
          <p>
            Visit us to explore a wide range of items tailored to meet your
            needs. Whether you're looking for the latest trends or timeless
            classics, our knowledgeable staff is here to help you find exactly
            what you need.
          </p>
          <p>
            We look forward to welcoming you to our shop and providing you with
            an exceptional shopping experience!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Map;
