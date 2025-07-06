// app/components/Navbar.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Circle, Moon, Sun, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleToggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <nav className="w-full border-b border-border dark:bg-black bg-white dark:text-white text-black shadow-sm fixed top-0 left-0 z-30">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Left Section */}
        <div className="flex items-center gap-3">
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="text-primary"
          >
            <Circle className="w-6 h-6" />
          </motion.div>
          <Link href="/" className="text-xl font-semibold">
            MyBlog
          </Link>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              onClick={() => setShowSearch((prev) => !prev)}
              className="p-2 rounded-full hover:bg-muted transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
            <AnimatePresence>
              {showSearch && (
                <motion.input
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 200, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  type="text"
                  placeholder="Search..."
                  className="absolute right-0 top-10 bg-white dark:bg-black border border-border rounded-full px-4 py-1 shadow-md text-sm focus:outline-none"
                />
              )}
            </AnimatePresence>
          </div>

          <motion.button
            onClick={handleToggleTheme}
            whileTap={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
            className="p-2 rounded-full hover:bg-muted transition-colors"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </motion.button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;