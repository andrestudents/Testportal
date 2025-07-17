import React, { useState, useEffect } from 'react';
import banner from "../assets/banner.jpg";
import paper from "../assets/paper.jpg";

function Banner() {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="relative h-screen overflow-hidden">
            {/* Background image with parallax effect */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url(${paper})`,
                    transform: `translateY(${scrollY * 0.5}px)`,
                    willChange: 'transform'
                }}
            />

            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-transparent bg-opacity-40" />

            {/* Text content with different parallax speed */}
            <div
                className="relative z-10 h-full flex items-center justify-center text-white text-center"
                style={{
                    transform: `translateY(${scrollY * 0.2}px)`,
                    willChange: 'transform'
                }}
            >
                <div>
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4">
                        Ideas
                    </h1>
                    <p className="text-lg md:text-xl lg:text-2xl font-light">
                        Where all our great things begin
                    </p>
                </div>
            </div>

            {/* Slanted bottom section */}
            <div className="absolute bottom-0 left-0 right-0 h-32 md:h-40 lg:h-110">
                <svg
                    className="absolute top-0 left-0 w-full h-full"
                    viewBox="0 0 1200 200"
                    preserveAspectRatio="none"
                    fill="white"
                >
                    <path d="M0,200 L1200,200 L1200,50 L0,150 Z" />
                </svg>
            </div>
        </div>
    );
}

export default Banner;