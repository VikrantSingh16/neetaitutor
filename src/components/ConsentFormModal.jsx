import React from 'react';

const ConsentFormModal = ({ setConsentForm }) => {
  function handleClose() {
    setConsentForm((prev) => !prev);
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-80 bg-gray-900 backdrop-blur-md z-50">
      <div className="bg-[#FF9A33] lg:rounded-lg md:rounded-lg mx-auto p-4 w-full md:w-4/5 h-auto max-h-screen overflow-y-auto">
        <div className="md:flex flex-col items-center">
          <div className="text-center">
            <h2 className="text-white text-2xl font-bold mt-[-6px]">Terms and Conditions</h2>
            <p className="mt-2 text-md text-white ml-5 mr-5 pb-20 pt-5 lg:pt-0 md:pt-0 lg:pb-0 md:pb-0" style={{ textAlign: 'left' }}>
              This consent form seeks your permission to collect your phone number and email address which will be used by the NEET AI Tutor solely for sending useful study material, knowledge points, and preparation tips for the NEET exam via SMS, WhatsApp, email, or other channels.
            </p>

            <ul className="mt-4 text-md text-white ml-5 mr-5 pb-20 pt-5 lg:pt-0 md:pt-0 lg:pb-0 md:pb-0" style={{ textAlign: 'left' }}>
              <li>• Your phone number and email address will only be used by NEET AI to send relevant content to help you prepare for the NEET exam.</li>
              <li>• Your contact information will not be shared with or sold to any third-party organizations.</li>
              <li>• We will not use your information for any promotional marketing of other products or services. Communications will be strictly limited to NEET exam preparation content.</li>
              <li>• You can opt out of receiving communications at any time by contacting help@simplemail.ai or clicking unsubscribe in emailers.</li>
              <li>• We will not share or publish your personal contact information anywhere public-facing.</li>
              <li>• Your contact information will be stored securely and deleted from our records after the NEET exam is over.</li>
              <li>• This consent is as per the Information Technology Act 2000 and its amendments which regulate the collection and use of personal information.</li>
            </ul>
            <p className="mt-2 text-md text-white ml-5 mr-5 pb-20 pt-5 lg:pt-0 md:pt-0 lg:pb-0 md:pb-0" style={{ textAlign: 'left' }}>
              I have read the above consent form and agree to provide my phone number and email address to NEET AI to receive NEET exam preparation content.
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center pt-5 mb-5">
          <button onClick={handleClose} className="text-[#33CC33] font-semibold px-4 py-2 rounded-md flex items-center mt-4 bg-white">
            I agree
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConsentFormModal;
