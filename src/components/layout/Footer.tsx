import React from 'react'
import Image from 'next/image';

// export const Footer = (props: {}) => {
export const Footer = () => {
  const banks = [
    { id: 1, src: '/images/banks/BMO.svg', alt: 'Bank 1', width: 100 },
    { id: 2, src: '/images/banks/TD.svg', alt: 'Bank 2', width: 100 },
    { id: 3, src: '/images/banks/RBC.svg', alt: 'Bank 3', width: 100 },
    { id: 4, src: '/images/banks/Scotia.svg', alt: 'Bank 4', width: 100 },
    { id: 5, src: '/images/banks/CIBC.svg', alt: 'Bank 5', width: 100 },
  ];
  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Partners Section */}
        <div className="mb-8">
          <p className="text-center text-sm text-gray-400 mb-6 tracking-wide uppercase">
            Banking Partners
          </p>
          <div className="flex justify-center items-center space-x-12">
            {banks.map((partner) => (
              <div key={partner.id} className="flex items-center grayscale opacity-70 hover:opacity-100 transition-opacity">
                <Image
                  src={partner.src}
                  alt={partner.alt}
                  width={partner.width}
                  height={24}
                  className="h-6 w-auto"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Terms and Privacy */}
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
          <a href="#" className="hover:text-gray-700">Terms & Conditions</a>
          <span>|</span>
          <a href="#" className="hover:text-gray-700">Privacy Policy</a>
        </div>
      </div>
    </footer>
  )
}
