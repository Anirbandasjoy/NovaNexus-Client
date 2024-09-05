import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Contact Information */}
      <section className="bg-blue-900 text-white py-16">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg mb-6">
            We'd love to hear from you. Reach out to us through any of the
            following methods:
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-12">
            <div className="bg-white p-6 rounded-lg shadow-lg flex justify-center items-center w-full h-32 md:w-1/3">
              <div>
                <h3 className="text-2xl font-semibold text-gray-500">
                  Address
                </h3>
                <p className="text-gray-700">
                  123 Business Rd,
                  <br />
                  Sukrabad 32,
                  <br />
                  City, Dhaka
                </p>
              </div>
            </div>
            <div className="bg-white p-6 flex justify-center items-center rounded-lg shadow-lg w-full h-32 md:w-1/3">
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-500">
                  Phone
                </h3>
                <p className="text-gray-700">+880 01772 838734</p>
              </div>
            </div>
            <div className="bg-white flex justify-center items-center p-6 rounded-lg shadow-lg w-full h-32 md:w-1/3">
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-500">
                  Email
                </h3>
                <p className="text-gray-700">try404@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="container mx-auto my-16 px-4">
        <h2 className="text-3xl font-semibold text-center mb-8">
          Get in Touch
        </h2>
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="col-span-1">
                <label
                  className="block text-sm font-medium text-gray-700 mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <Input
                  id="name"
                  type="text"
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  placeholder="Your Name"
                />
              </div>
              <div className="col-span-1">
                <label
                  className="block text-sm font-medium text-gray-700 mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  placeholder="Your Email"
                />
              </div>
            </div>
            <div className="mb-6">
              <label
                className="block text-sm font-medium text-gray-700 mb-2"
                htmlFor="message"
              >
                Message
              </label>
              <Textarea
                id="message"
                className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                placeholder="Your Message"
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-md shadow-lg hover:bg-blue-700 transition"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Map Section */}
      <section className="container mx-auto my-16 px-4">
        <h2 className="text-3xl font-semibold text-center mb-8">
          Our Location
        </h2>
        <div className="relative w-full h-80">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.825832207352!2d90.3772749742072!3d23.753589488656026!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b9df1909989b%3A0x58da21576aa858d9!2s32%20Sukrabad%20Rd%2C%20Dhaka%201215!5e0!3m2!1sen!2sbd!4v1725572045145!5m2!1sen!2sbd"
            width="100%"
            height="100%"
            // allowfullscreen=""
            loading="lazy"
            // referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
