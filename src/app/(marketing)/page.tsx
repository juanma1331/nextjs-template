import Container from "@/components/ui/Container";
import Link from "next/link";
import React from "react";
import { Lock, Database, Zap } from "lucide-react";

export default function Home() {
  return (
    <Container className="py-16 bg-gradient-to-b from-primary/10 to-white">
      <div className="text-center">
        <AnimatedLogo />
        <h1 className="text-5xl font-extrabold mb-6 text-gray-900 tracking-tight">
          Welcome to Next.js Template
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          A professional template featuring Lucia for secure authentication and
          Drizzle ORM for efficient database management.
        </p>
      </div>
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <FeatureCard
          title="Robust Authentication"
          description="Implement secure authentication effortlessly with Lucia."
          icon={<Lock className="h-8 w-8 text-primary" />}
        />
        <FeatureCard
          title="Powerful ORM"
          description="Manage your database efficiently using Drizzle ORM."
          icon={<Database className="h-8 w-8 text-primary" />}
        />
        <FeatureCard
          title="Optimized Performance"
          description="Leverage Next.js optimizations for a smooth user experience."
          icon={<Zap className="h-8 w-8 text-primary" />}
        />
      </div>
    </Container>
  );
}

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function AnimatedLogo() {
  return (
    <svg
      className="mx-auto mb-8 w-48 h-48 logo-hover"
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      aria-labelledby="logoTitle"
      role="img"
    >
      <title id="logoTitle">Animated Logo of Next.js Template</title>
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--primary))" />
          <stop offset="100%" stopColor="hsl(var(--primary) / 0.8)" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g transform="translate(100 100)">
        <circle r="80" fill="url(#gradient)" opacity="0.3">
          <animate
            attributeName="r"
            values="75;80;75"
            dur="4s"
            repeatCount="indefinite"
          />
        </circle>
        <path
          d="M0 -80 L69.28 40 L0 80 L-69.28 40 Z"
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#glow)"
        >
          <animate
            attributeName="stroke-dasharray"
            values="0 1000;1000 0"
            dur="4s"
            repeatCount="indefinite"
          />
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0"
            to="360"
            dur="20s"
            repeatCount="indefinite"
          />
        </path>
        <circle
          r="40"
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="4"
          strokeLinecap="round"
          filter="url(#glow)"
        >
          <animate
            attributeName="stroke-dasharray"
            values="0 1000;1000 0"
            dur="4s"
            repeatCount="indefinite"
          />
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0"
            to="-360"
            dur="16s"
            repeatCount="indefinite"
          />
        </circle>
      </g>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .logo-hover {
          animation: fadeIn 1s ease-out;
        }
        .logo-hover:hover path,
        .logo-hover:hover circle {
          animation-play-state: paused;
        }
      `}</style>
    </svg>
  );
}
