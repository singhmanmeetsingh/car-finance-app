import React from 'react'
import Image from "next/image"
// export const Header = (props: {}) => {
export const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex flex-col items-center space-y-2">
          <Image
            src=""
            alt="401 Auto Financing"
            width={200}
            height={60}
          />
          <div className="text-sm text-gray-600 space-y-1 text-center">
            <p>Compare Car Loans From 25+ Lenders</p>
            <p>Rates From 0% - No Money Down</p>
            <p>Receive Instant Offers - Guaranteed Approvals</p>
          </div>
        </div>
      </div>
    </header>
  )
}
