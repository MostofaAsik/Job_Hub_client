import React from 'react';
import { motion } from 'framer-motion';
import team1 from '../assets/team/team2.jpg';
import team2 from '../assets/team/team1.jpg';

const Banner = () => {
    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className='flex-1'>
                    <motion.img
                        className=' w-[300px] rounded-t-[40px] rounded-br-[40px] shadow-2xl border-l-4  border-b-4 border-blue-500'
                        src={team1}

                        animate={{ y: [-5, 50, -5] }}
                        transition={{ duration: 10, repeat: Infinity }}
                    />
                    <motion.img
                        className='w-[300px] rounded-t-[40px] rounded-br-[40px] shadow-2xl border-l-4  border-b-4 border-blue-500'
                        src={team2}

                        animate={{ x: [150, 100, 150] }}
                        transition={{ duration: 10, repeat: Infinity }}
                    />
                </div>
                <motion.div
                    className='flex-1'
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <motion.h1
                        className="text-5xl font-bold"
                        animate={{
                            scale: [1, 1.1, 1],
                            color: ["#ff0000", "#00ff00", "#0000ff", "#ff00ff", "#ff0000"]
                        }}
                        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    >
                        Welcome to Job Hub!
                    </motion.h1>
                    <p className="py-6">
                        Find your dream job with ease. We connect talents with top opportunities to build a successful career.
                    </p>
                    <motion.button
                        className="btn btn-primary"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        Get Started
                    </motion.button>
                </motion.div>
            </div>
        </div>
    );
};

export default Banner;
