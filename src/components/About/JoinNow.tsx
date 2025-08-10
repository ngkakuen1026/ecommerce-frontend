import { Link } from "react-router-dom";

const JoinNow = () => {
  return (
    <div className="p-12 rounded-lg shadow-md text-center">
      <h2 className="text-3xl font-semibold mb-4">Join Us Today!</h2>
      <p className="text-lg text-gray-600 mb-8">
        Become a part of our community and unlock exclusive benefits. Sign up
        now to stay updated and connect with like-minded individuals.
      </p>
      <Link
        to="/register"
        className="bg-orange-600 text-white px-6 py-3 rounded-lg transition duration-300 hover:bg-orange-500 inline-block"
      >
        Register Now
      </Link>
    </div>
  );
};

export default JoinNow;
