import React from 'react'
import Image from 'next/image';

// export const Footer = (props: {}) => {
export const Footer = () => {
  const banks = [
    { id: 1, src: '/images/banks/BMO.svg', alt: 'Bank 1' },
    { id: 2, src: '/images/banks/TD.svg', alt: 'Bank 2' },
    { id: 3, src: '/images/banks/RBC.svg', alt: 'Bank 3' },
    { id: 4, src: '/images/banks/Scotia.svg', alt: 'Bank 4' },
    { id: 5, src: '/images/banks/CIBC.svg', alt: 'Bank 5' },
  ];
  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center">
          {/* This empty div helps maintain the centering */}
          <div className="flex-1"></div>

          {/* Centered links */}
          <div className="flex justify-center space-x-2 text-sm text-gray-500">
            <a href="#" className="hover:text-gray-700">Terms & Conditions</a>
            <span>|</span>
            <a href="#" className="hover:text-gray-700">Privacy Policy</a>
          </div>

          {/* Right-aligned bank icons */}
          <div className="flex-1 flex justify-end items-center">
            <div className='text-gray-500 text-sm mx-5'>Banking Partners </div>
            <div className="grid grid-cols-5 gap-5">
              {banks.map((bank) => (
                <div key={bank.id} className="flex items-center justify-center">
                  <Image
                    src={bank.src}
                    alt={bank.alt}
                    width={32}
                    height={32}
                    className="text-gray-400"
                  />
                </div>
              ))}            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
