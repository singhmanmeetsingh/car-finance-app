import React from 'react'

export const Footer = (props: {}) => {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex justify-center space-x-4 text-sm text-gray-500">
          <a href="#" className="hover:text-gray-700">Terms & Conditions</a>
          <span>|</span>
          <a href="#" className="hover:text-gray-700">Privacy Policy</a>
        </div>
      </div>
    </footer>
  )
}
