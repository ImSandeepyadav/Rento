"use client";

import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();

  return (
    <div 
      onClick={() => router.push('/')}
      className="hidden md:block cursor-pointer w-[100px] h-[100px]"
    >
      <svg 
        viewBox="0 0 200 200" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="circleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" className="stop-color:#FF6B6B;stop-opacity:1" />
            <stop offset="50%" className="stop-color:#4ECDC4;stop-opacity:1" />
            <stop offset="100%" className="stop-color:#45B7D1;stop-opacity:1" />
          </linearGradient>

          <animate 
            xlinkHref="#mainCircle"
            attributeName="r"
            values="48;50;48"
            dur="2s"
            repeatCount="indefinite"
          />
          
          <animateTransform
            xlinkHref="#innerElements"
            attributeName="transform"
            type="rotate"
            from="0 100 100"
            to="360 100 100"
            dur="20s"
            repeatCount="indefinite"
          />

          <animate
            xlinkHref="#gradientOverlay"
            attributeName="opacity"
            values="0.7;0.9;0.7"
            dur="4s"
            repeatCount="indefinite"
          />
        </defs>

        {/* Base circle */}
        <circle 
          id="mainCircle" 
          cx="100" 
          cy="100" 
          r="48" 
          fill="#8B6B6B"
        />

        {/* Gradient overlay */}
        <circle 
          id="gradientOverlay"
          cx="100" 
          cy="100" 
          r="48" 
          fill="url(#circleGradient)"
          opacity="0.7"
        />

        {/* Inner rotating elements with different colors */}
        <g id="innerElements">
          <circle cx="100" cy="60" r="4" fill="#FF6B6B" opacity="0.9"/>
          <circle cx="140" cy="100" r="4" fill="#4ECDC4" opacity="0.9"/>
          <circle cx="100" cy="140" r="4" fill="#45B7D1" opacity="0.9"/>
          <circle cx="60" cy="100" r="4" fill="#96CEB4" opacity="0.9"/>
        </g>

        {/* Main text with gradient */}
        <text 
          x="100" 
          y="105"
          fontFamily="Arial, sans-serif"
          fontSize="20"
          fontWeight="bold"
          fill="white"
          textAnchor="middle"
        >
          RENTO
          <animate
            attributeName="opacity"
            values="1;0.8;1"
            dur="2s"
            repeatCount="indefinite"
          />
        </text>

        {/* Decorative ring */}
        <circle 
          cx="100"
          cy="100"
          r="44"
          fill="none"
          stroke="white"
          strokeWidth="1"
          opacity="0.3"
        />
      </svg>
    </div>
  );
}

export default Logo;