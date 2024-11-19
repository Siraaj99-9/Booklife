import Link from "next/link";
import React from "react";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 font-sans text-xs py-20 w-full">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4">
        <div className="mx-5">
          <h3 className="font-bold mb-4 text-white">FOLLOW US</h3>
          <ul>
            <li className="mb-2 flex items-center">
              <FaInstagram className="icons instagram text-white hover:text-gray-500" />
                Instagram
            </li>
            <li className="mb-2 flex items-center">
              <FaFacebook className="icons facebook text-white hover:text-gray-500" />
                Facebook
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-4 text-white">INFORMATION</h3>
          <ul>
            <li className="mb-2 hover:text-red-600">
              <Link href="/about">About</Link>
            </li>
            <li className="mb-2 hover:text-red-600">
              <Link href="/Help">Help</Link>
            </li>
            <li className="mb-2 hover:text-red-600">
              <Link href="/contact">Contact Us</Link>
            </li>
            <li className="mb-2 hover:text-red-600">
              <Link href="/custom-orders">Custom Orders</Link>
            </li>
            <li className="mb-2 hover:text-red-600">
              <Link href="/info-act">Information Act</Link>
            </li>
            <li className="mb-2 hover:text-red-600">
              <Link href="/terms-conditions">Terms & Conditions</Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-4 text-white">CONTACT US</h3>
          <div className="mt-4">
            <p className="font-bold">CAPE TOWN:</p>
            <p>Tel: +27 21-123-4567</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
