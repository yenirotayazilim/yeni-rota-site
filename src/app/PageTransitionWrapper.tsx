'use client'
import { motion } from "framer-motion"
import { usePathname } from "next/navigation"

export default function PageTransitionWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42, ease: [0.19, 1, 0.22, 1] }}
      className="flex-grow w-full min-h-screen"
      style={{ minHeight: '100vh', width: '100%' }}
    >
      {children}
    </motion.div>
  );
}
