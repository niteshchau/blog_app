"use client"
import React, { useState } from 'react';
import { Pen, Zap, Users, TrendingUp, ArrowRight, Menu, X, Images } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Editor from "@/public/editor.png";
import Image from 'next/image';

export default function BlogLandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const router = useRouter();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: <Pen className="w-8 h-8" />,
      title: "Rich Editor",
      description: "Beautiful markdown editor with live preview and formatting tools"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast",
      description: "Optimized performance with instant page loads and smooth navigation"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Build Community",
      description: "Engage readers with comments, likes, and social sharing"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Analytics",
      description: "Track your growth with detailed insights and reader metrics"
    }
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-600 via-purple-700 to-indigo-800">
      {/* Navigation */}


      {/* Hero Section */}
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight">
            Your Stories,
            <br />
            <span className="bg-linear-to-r from-pink-300 to-purple-200 bg-clip-text text-transparent">
              Beautifully Told
            </span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-purple-100 mb-12 max-w-3xl mx-auto">
            The modern blogging platform for writers who care about craft. 
            Publish, grow, and monetize your voice.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button onClick={ () => router.push("/new-story")} className="group px-8 py-4 bg-white text-purple-600 rounded-full font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all flex items-center gap-2">
              Start Writing Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 bg-purple-500/30 backdrop-blur-sm text-white rounded-full font-bold text-lg border-2 border-white/30 hover:bg-purple-500/50 hover:scale-105 transition-all">
              Watch Demo
            </button>
          </div>


        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold text-white text-center mb-16">
            Everything you need to publish
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:bg-white/15 hover:scale-105 transition-all cursor-pointer"
              >
                <div className="bg-purple-500/30 w-16 h-16 rounded-xl flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-purple-100">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Ready to share your story?
          </h2>
          <p className="text-xl text-purple-100 mb-10">
            Join thousands of writers already using Inkwell
          </p>
          <button onClick={ () => router.push("/blog")} className="px-10 py-5 bg-white text-purple-600 rounded-full font-bold text-xl hover:shadow-2xl hover:scale-105 transition-all">
            Get Started Now
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-purple-900/50 backdrop-blur-sm py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center text-purple-200">
          <p className="text-lg font-semibold mb-2">Inkwell</p>
          <p className="text-sm">© 2024 Inkwell. Write beautifully.</p>
        </div>
      </footer>
    </div>
  );
}