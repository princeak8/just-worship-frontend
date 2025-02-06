import type React from 'react';
import BG from '@/public/gallery/gallery4.jpeg';
import MapImage from '@/public/mapsample.jpg'; 

const ContactUs: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 lg:px-4 sm:px-6 lg:px-8 py-24">
      <section className='h-60 flex items-center mb-12' style={{backgroundImage: `url(${BG})`, backgroundSize: 'cover'}}>
        <div className='slant w-7/12 bg-black bg-opacity-50 h-full flex items-center lg:px-40 text-white'>
          <header className="text-center p-2">
            <h1 className="text-lg lg:text-4xl font-bold mb-3">Contact Us</h1>
          </header>
        </div>
      </section>

      <section className="container mb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/2 bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
            <form>
              <div className="mb-6">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your Email"
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your Message"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300"
              >
                Send Message
              </button>
            </form>
          </div>

          <div className="w-full lg:w-1/2 bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Address</h3>
                <p className="text-lg text-gray-700">123 Tech Street, Innovation City, IC 45678</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Phone</h3>
                <p className="text-lg text-gray-700">+1 (123) 456-7890</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Email</h3>
                <p className="text-lg text-gray-700">info@techcompany.com</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Working Hours</h3>
                <p className="text-lg text-gray-700">Mon - Fri: 9:00 AM - 6:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Our Location</h2>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src={MapImage}
              alt="Map"
              className="w-full h-96 object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;