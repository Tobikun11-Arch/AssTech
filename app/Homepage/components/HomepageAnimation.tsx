"use client";
import { motion } from "framer-motion";

export default function MovingWaves() {
    return (
        <svg className="absolute inset-0 w-full h-full -mt-24 text-gray-200 opacity-40" fill="none" viewBox="0 0 1440 400">
        {[...Array(10)].map((_, i) => (
            <motion.path
            key={i}
            fill="none"
            stroke="currentColor"
            strokeWidth={1 + i * 0.3} 
            opacity={0.7 - i * 0.05}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
                duration: 6 + i * 0.5,
                repeat: Infinity,
                repeatType: "reverse", 
                delay: i * 0.3, 
                ease: "easeInOut",
            }}
            d={`M0,${100 + i * 25} Q360,${180 - i * 20} 720,${140 + i * 30} T1440,${100 + i * 20}`}
            />
        ))}
        </svg>
    );
}
