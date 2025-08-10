const Partnership = () => {
  const partnerData = [
    {
      title: "Local Artisans",
      description:
        "We collaborate with talented local artisans to offer unique, handcrafted products",
      image:
        "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202502/role-of-local-artisans-in-revolutionising-the-furniture-retail-industry-112853753-16x9_0.jpg?VersionId=zUsR.udSwTZkyqb_kmxIE58KAJA49Ujc&size=690:388",
    },
    {
      title: "Eco-Friendly Brands",
      description:
        "Partnering with eco-conscious brands to promote sustainability inevery purchase.",
      image:
        "https://i0.wp.com/blog.credo.com/wp-content/uploads/2021/01/credo_tip_eco_friendly_brands-1.png?fit=800%2C407&ssl=1",
    },
    {
      title: "Community Organizations",
      description:
        "Working together with local organizations to give back to ourcommunity.",
      image:
        "https://www.cdcfoundation.org/sites/default/files/styles/hero/public/2023-11/cbolandinghero3.png?itok=KE61zew1",
    },
  ];

  return (
    <div className="p-12 bg-gradient-to-l from-blue-50 to-white">
      <div className="max-w-screen-2xl mx-auto flex flex-col items-center">
        <h2 className="text-3xl font-semibold mb-8">Our Partnerships</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {partnerData.map((partner, index) => (
            <div
              className="bg-white p-6 rounded-lg shadow-lg text-center"
              key={index}
            >
              <img
                src={partner.image}
                alt="Partnership 1"
                className="w-full h-96 object-cover rounded-t-lg"
              />
              <h3 className="text-xl font-semibold mt-4">{partner.title}</h3>
              <p className="text-gray-600">{partner.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Partnership;
