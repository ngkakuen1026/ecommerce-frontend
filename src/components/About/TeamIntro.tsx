const TeamIntro = () => {
  const teamData = [
    {
      name: "Emily Johnson",
      position: "CEO",
      image:
        "https://img.freepik.com/free-photo/lifestyle-people-emotions-casual-concept-confident-nice-smiling-asian-woman-cross-arms-chest-confident-ready-help-listening-coworkers-taking-part-conversation_1258-59335.jpg",
    },
    {
      name: "Michael Smith",
      position: "CTO",
      image:
        "https://t4.ftcdn.net/jpg/02/24/86/95/360_F_224869519_aRaeLneqALfPNBzg0xxMZXghtvBXkfIA.jpg",
    },
    {
      name: "Sarah Lee",
      position: "Product Manager",
      image:
        "https://media.istockphoto.com/id/1413766112/photo/successful-mature-businessman-looking-at-camera-with-confidence.jpg?s=612x612&w=0&k=20&c=NJSugBzNuZqb7DJ8ZgLfYKb3qPr2EJMvKZ21Sj5Sfq4=",
    },
    {
      name: "David Brown",
      position: "Marketing Head",
      image:
        "https://static.vecteezy.com/system/resources/thumbnails/005/346/410/small_2x/close-up-portrait-of-smiling-handsome-young-caucasian-man-face-looking-at-camera-on-isolated-light-gray-studio-background-photo.jpg",
    },
    {
      name: "Sophia Turner",
      position: "Design Lead",
      image:
        "https://media.istockphoto.com/id/1394347360/photo/confident-young-black-businesswoman-standing-at-a-window-in-an-office-alone.jpg?s=612x612&w=0&k=20&c=tOFptpFTIaBZ8LjQ1NiPrjKXku9AtERuWHOElfBMBvY=",
    },
    {
      name: "Liam Johnson",
      position: "Customer Manager",
      image:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      name: "Olivia Davis",
      position: "Sales Manager",
      image:
        "https://static.vecteezy.com/system/resources/thumbnails/038/962/461/small/ai-generated-caucasian-successful-confident-young-businesswoman-ceo-boss-bank-employee-worker-manager-with-arms-crossed-in-formal-wear-isolated-in-white-background-photo.jpg",
    },
  ];

  return (
    <div className="max-w-screen-2xl mx-auto p-12">
      <h2 className="text-4xl font-semibold text-center mb-8">Meet Our Team</h2>
      <p className="text-lg text-gray-600 mb-8">
        Our team is dedicated to delivering exceptional service and innovative
        solutions for our customers. With a diverse set of skills and a shared
        passion for excellence, we collaborate closely to understand our
        customers' needs and exceed their expectations. Each member brings
        unique perspectives and expertise, which allows us to tackle challenges
        creatively and effectively. We believe in fostering a culture of
        continuous improvement, where feedback is valued, and learning is a
        constant journey. Together, we strive to build meaningful relationships
        with our clients, ensuring that every interaction is characterized by
        trust, integrity, and respect. At the heart of our mission is a
        commitment to making a positive impact in the communities we serve.
      </p>
      <div className="flex items-center justify-center gap-12">
        <div className="text-center items-center justify-center py-12">
          <img
            src={teamData[0].image}
            className="object-cover w-[24rem] h-[24rem] rounded-full mb-2"
          />
          <h1 className="text-2xl font-semibold text-cyan-600">
            {teamData[0].position}
          </h1>
          <h2 className="text-lg text-gray-600">{teamData[0].name}</h2>
        </div>
        <div className="border-l-[1px] border-dashed border-gray-600 px-12">
          <div className="flex gap-[6rem] py-12">
            {teamData.slice(1, 4).map((member, index) => (
              <div className="text-center" key={index}>
                <img
                  src={member.image}
                  className="object-cover w-[16rem] h-[16rem] rounded-full mb-2"
                />
          <h1 className="text-2xl font-semibold text-cyan-600">
                  {member.position}
                </h1>
                <h2 className="text-lg text-gray-600">{member.name}</h2>
              </div>
            ))}
          </div>
          <div className="flex gap-[6rem] py-12">
            {teamData.slice(4).map((member, index) => (
              <div className="text-center" key={index}>
                <img
                  src={member.image}
                  className="object-cover w-[16rem] h-[16rem] rounded-full mb-2"
                />
                <h1 className="text-2xl font-semibold text-cyan-600">
                  {member.position}
                </h1>
                <h2 className="text-lg text-gray-600">{member.name}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamIntro;
