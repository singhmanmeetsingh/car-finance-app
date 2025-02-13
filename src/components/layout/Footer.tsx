import React from 'react'
import Image from 'next/image';
import BMO from "@/assets/images/banks/BMO.svg"
import TD from "@/assets/images/banks/TD.svg"
import RBC from "@/assets/images/banks/RBC.svg"
import Scotia from "@/assets/images/banks/Scotia.svg"
import CIBC from "@/assets/images/banks/CIBC.svg"

// export const Footer = (props: {}) => {
export const Footer = () => {
  const banks = [
    { id: 1, src: BMO, alt: 'Bank 1', width: 100 },
    { id: 2, src: TD, alt: 'Bank 2', width: 100 },
    { id: 3, src: RBC, alt: 'Bank 3', width: 100 },
    { id: 4, src: Scotia, alt: 'Bank 4', width: 100 },
    { id: 5, src: CIBC, alt: 'Bank 5', width: 100 },
  ]


  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Partners Section */}
        <div className="mb-8">
          <p className="text-center text-sm text-gray-400 mb-6 tracking-wide uppercase">
            Trusted by the industry leaders
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
                  unoptimized
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
