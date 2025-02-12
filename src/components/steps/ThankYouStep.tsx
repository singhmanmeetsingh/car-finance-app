import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
// import Image from 'next/image';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24
    }
  }
};

export function ThankYouStep() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-2xl mx-auto text-center px-4 py-12"
    >
      {/* Logo */}
      <motion.div variants={itemVariants} className="mb-8">
        {/* <Image */}
        {/*   src="/logo.png" */}
        {/*   alt="401 Auto RV Canada Inc." */}
        {/*   width={200} */}
        {/*   height={60} */}
        {/*   className="mx-auto" */}
        {/* /> */}
      </motion.div>

      {/* Success Icon */}
      <motion.div
        variants={itemVariants}
        className="flex justify-center mb-6"
      >
        <CheckCircle className="w-16 h-16 text-green-500" />
      </motion.div>

      {/* Thank You Message */}
      <motion.div variants={itemVariants}>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Thank You!
        </h2>
      </motion.div>

      {/* Confirmation Message */}
      <motion.div variants={itemVariants}>
        <p className="text-lg text-gray-600 mb-8">
          A complete copy of your application has been assigned to a<br />
          <span className="font-semibold">Get Your Car Approved Credit Specialist</span> who will contact you<br />
          shortly
        </p>
      </motion.div>

      {/* Additional Information */}
      <motion.div
        variants={itemVariants}
        className="text-sm text-gray-500 mt-8"
      >
        <p>
          You will receive a confirmation email with your application details.
        </p>
      </motion.div>
    </motion.div>
  );
}
