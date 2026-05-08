import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';

const Counter = ({ value }) => {
    const ref = useRef(null);
    // Start animation when element is 10% into view, and only run it once
    const isInView = useInView(ref, { once: true, margin: "-10%" });

    // Extract numerical part and suffix (e.g. "99.9%" -> "99.9" and "%")
    const match = value.match(/^([\d.]+)(.*)$/);
    
    if (!match) {
        return <span ref={ref}>{value}</span>; // Fallback for non-matching strings
    }

    const numValue = parseFloat(match[1]);
    const suffix = match[2];
    
    // Determine how many decimal places to show
    const isFloat = match[1].includes('.');
    const decimals = isFloat ? match[1].split('.')[1].length : 0;

    const count = useMotionValue(0);
    
    // Transform the raw motion value into formatted string with suffix
    const rounded = useTransform(count, (latest) => 
        latest.toFixed(decimals) + suffix
    );

    useEffect(() => {
        // Only run animation if the element has scrolled into view
        if (isInView) {
            const controls = animate(count, numValue, { 
                duration: 2.5, 
                ease: [0.22, 1, 0.36, 1] // Custom snappy easing
            });
            return () => controls.stop();
        }
    }, [count, numValue, isInView]);

    return <motion.span ref={ref}>{rounded}</motion.span>;
};

export default Counter;
