/* eslint-disable no-unused-vars */
import React from 'react';

const UserProfile = () => {
  return (
    <section className="h-screen bg-gray-100">
      <div className="container mx-auto py-20 h-full">
        <div className="flex justify-center items-center h-full">
          <div className="w-full lg:w-1/2 mb-4">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="flex">
                <div className="w-1/3 bg-gradient-to-tr from-purple-500 to-pink-500 text-white text-center p-4">
                  <img 
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                    alt="Avatar"
                    className="mx-auto rounded-full h-20 w-20 my-2"
                  />
                  <h5 className="text-lg">Marie Horwitz</h5>
                  <p>Web Designer</p>
                  <i className="far fa-edit mb-3"></i>
                </div>
                <div className="w-2/3 p-4">
                  <h6 className="text-lg font-semibold">Information</h6>
                  <hr className="mt-1 mb-4 border-gray-300" />
                  <div className="flex">
                    <div className="w-1/2 mb-3">
                      <h6 className="font-semibold">Email</h6>
                      <p className="text-gray-600">info@example.com</p>
                    </div>
                    <div className="w-1/2 mb-3">
                      <h6 className="font-semibold">Phone</h6>
                      <p className="text-gray-600">123 456 789</p>
                    </div>
                  </div>
                  <h6 className="text-lg font-semibold">Projects</h6>
                  <hr className="mt-1 mb-4 border-gray-300" />
                  <div className="flex">
                    <div className="w-1/2 mb-3">
                      <h6 className="font-semibold">Recent</h6>
                      <p className="text-gray-600">Lorem ipsum</p>
                    </div>
                    <div className="w-1/2 mb-3">
                      <h6 className="font-semibold">Most Viewed</h6>
                      <p className="text-gray-600">Dolor sit amet</p>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <a href="#!" className="text-blue-600">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="#!" className="text-blue-400">
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a href="#!" className="text-pink-600">
                      <i className="fab fa-instagram"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
