import React, { useState } from 'react';
import { Zap } from 'lucide-react';
import { plugin_url } from '../config/config';
const MagicButton = () => {
    const [isActive, setIsActive] = useState(false);

    const handleClick = () => {
        setIsActive(true);
        setTimeout(() => setIsActive(false), 1000);
        window.open(plugin_url, '_blank');
    };

    return (
        <div className="inline-block relative w-fit">
            {/* Animated Crazy Border */}
            <div
                className="absolute -inset-1 rounded-full 
                   bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 
                   animate-[spin_3s_linear_infinite] 
                   blur-sm opacity-70"
                style={{
                    backgroundSize: '400% 400%',
                    animation: 'gradient-spin 3s linear infinite'
                }}
            />

            <button
                onClick={handleClick}
                className="relative z-10 px-8 py-4 
                   bg-gradient-to-r from-purple-800 to-blue-800 
                   text-white font-bold rounded-full 
                   transform transition-all duration-300 
                   hover:scale-110 active:scale-95
                   shadow-2xl overflow-hidden
                   flex items-center justify-center
                   group"
            >
                <Zap className="mr-2 animate-pulse group-hover:animate-spin" />
                Use BlueAI instead
            </button>

            {/* Particle Burst */}
            {isActive && (
                <div className="absolute inset-0 pointer-events-none">
                    {[...Array(40)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-2 h-2 bg-white/80 rounded-full 
                         animate-[particle_1s_ease-out_forwards]"
                            style={{
                                left: '50%',
                                top: '50%',
                                transform: `translate(-50%, -50%) 
                           rotate(${Math.random() * 360}deg) 
                           translateX(${(Math.random() - 0.5) * 300}px) 
                           translateY(${(Math.random() - 0.5) * 300}px)`,
                                animationDelay: `${Math.random() * 0.5}s`,
                                opacity: 0
                            }}
                        />
                    ))}
                </div>
            )}

            {/* Global Styles for Animations */}
            <style jsx global>{`
        @keyframes gradient-spin {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes particle {
          to {
            transform: translate(-50%, -50%) 
                       rotate(${Math.random() * 360}deg) 
                       translateX(${(Math.random() - 0.5) * 500}px) 
                       translateY(${(Math.random() - 0.5) * 500}px) 
                       scale(2);
            opacity: 0;
          }
        }
      `}</style>
        </div>
    );
};

export default MagicButton;