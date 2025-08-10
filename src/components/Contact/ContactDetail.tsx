import { Mail, MessageSquare, Phone } from "lucide-react";
import { Link as ScrollLink } from "react-scroll";

const ContactDetail = () => {
  return (
    <div>
      <div className="max-w-screen-2xl mx-auto items-center py-12 px-6">
        <div className="mb-12">
          <h1 className="text-3xl font-semibold text-center mb-6">
            Want to Reach Out?
          </h1>
          <div className="text-gray-600">
            <p className="text-lg">
              Our team is here to assist you with any inquiries you may have.
              Whether you have a question about an order, need support, or just
              want to say hello, we're here to help!
            </p>
            <p className="text-lg">
              At Shoporia, we pride ourselves on providing exceptional customer
              service. Our dedicated Client Relations team is available to
              answer your questions, offer guidance, and ensure that your
              experience with us is seamless and enjoyable.
            </p>
            <p className="text-lg">
              If you're looking for assistance with our products, have feedback
              to share, or need help navigating our website, don't hesitate to
              reach out. We value your input and are committed to making your
              experience with us the best it can be. For urgent matters, please
              use our live chat feature, or feel free to give us a call. We look
              forward to hearing from you!
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center p-6 rounded-lg">
            <Phone className="text-5xl mb-2" />
            <h2 className="text-xl">Telephone</h2>
            <p className="text-gray-600 text-lg">
              Client Relations: <span className="">+852-12345678</span>
            </p>
          </div>
          <div className="flex flex-col items-center p-6 rounded-lg">
            <ScrollLink to="contact-email" smooth={true} duration={500}>
              <Mail className="text-5xl mb-2 cursor-pointer hover:opacity-50" />
            </ScrollLink>
            <h2 className="text-xl ">Email</h2>
            <p className="text-gray-600 text-lg">
              Contact: <span className="">Support@sample.com</span>
            </p>
          </div>
          <div className="flex flex-col items-center p-6 rounded-lg">
            <MessageSquare className="text-5xl mb-2" />
            <h2 className="text-xl ">Live Chat</h2>
            <p className="text-gray-600 text-lg">
              Need immediate assistance?{" "}
              <span className="">Open Live Chat</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactDetail;
