import React, { useState } from 'react';
import emailjs from 'emailjs-com'; // Ensure you have this package installed
import { FaEnvelope, FaMapMarkedAlt, FaPhone } from 'react-icons/fa';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [emailError, setEmailError] = useState(''); // State for email error message

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex
    return regex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return; // Prevent sending email if email is invalid
    }

    setEmailError(''); // Clear email error if valid

    const serviceId = "service_k4f2qfo";
    const templateId = "template_ufxgv8n";
    const publicKey = "q-HvseK2-sN1t1rIW"; // Replace with your actual public key

    const templateParams = {
      from_name: name,
      from_email: email,
      to_name: "faizan",
      message: message,
    };

    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        console.log("Email sent successfully!", response);
        setName('');
        setEmail('');
        setMessage('');
        setShowAlert(true);
        setAlertMessage("Email sent successfully!");
        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
      })
      .catch((error) => {
        console.log("Error sending email:", error);
        setShowAlert(true);
        setAlertMessage("Error sending email. Please try again.");
        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
      });
  };

  return (
    <div className="bg-black text-white py-20" id="contact">
      <div className="container mx-auto px-8 md:px-16 lg:px-24">
        <h2 className="text-4xl font-bold text-center mb-12">Contact Me</h2>
        <div className="flex flex-col md:flex-row items-center md:space-x-12">
          <div className="flex-1">
            <h3 className='text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-4'>Let's Talk</h3>
            <p>I'm open to discussing web development projects or partnership opportunities.</p>
            <div className='mb-4 mt-8'>
              <FaEnvelope className='inline-block text-green-400 mr-2' />
              <a href="mailto:faizannasim59@gmail.com" className='hover:underline'>
                faizannasim59@gmail.com
              </a>
            </div>
            <div className='mb-4'>
              <FaPhone className='inline-block text-green-400 mr-2' />
              <span>+7532053343</span>
            </div>
            <div className='mb-4'>
              <FaMapMarkedAlt className='inline-block text-green-400 mr-2' />
              <span>Delhi</span>
            </div>
          </div>
          <div className='flex-1 w-full'>
            <form onSubmit={handleSubmit} className='space-y-4'>
              <div>
                <label htmlFor="name" className='block mb-2'>Your Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className='w-full p-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:border-green-400'
                  placeholder='Enter Your Name' />
              </div>
              <div>
                <label htmlFor="email" className='block mb-2'>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='w-full p-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:border-green-400'
                  placeholder='Enter Your Email' />
                {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>} {/* Email error message */}
              </div>
              <div>
                <label htmlFor="message" className='block mb-2'>Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className='w-full p-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:border-green-400'
                  rows="5"
                  placeholder='Enter Your Message' />
              </div>
              <button
                type="submit"
                className='bg-gradient-to-r from-green-400 to-blue-500 text-white inline-block transform transition-transform duration-300 hover:scale-105 px-8 py-2 rounded-full'
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
      {showAlert && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-md shadow-md">
            <p className="text-green-500 font-bold text-lg">{alertMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;