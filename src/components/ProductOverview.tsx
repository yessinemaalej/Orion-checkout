import React from 'react';
import { Zap, Globe, Shield, Wifi, Cpu, Award } from 'lucide-react';

export const ProductOverview: React.FC = () => {
  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Renewable Energy Powered",
      description: "100% sustainable operation with solar and wind integration"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Starlink Connectivity",
      description: "Global satellite internet ensures 99.9% uptime anywhere"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Odyssey Chain Validation",
      description: "Secure validation on the cutting-edge Odyssey blockchain"
    },
    {
      icon: <Wifi className="w-6 h-6" />,
      title: "Remote Operation",
      description: "Monitor and manage your validator from anywhere in the world"
    },
    {
      icon: <Cpu className="w-6 h-6" />,
      title: "High Performance",
      description: "Enterprise-grade hardware for optimal validation efficiency"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Proven Reliability",
      description: "Field-tested technology with 24/7 monitoring and support"
    }
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="relative">
          <h1 className="text-5xl md:text-6xl font-bold text-gradient mb-4 tracking-tight animate-fade-in-up">
            Orion Validator
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-light animate-fade-in-up animation-delay-200">
            The world's first renewable energy-powered remote validator for the Dione blockchain. 
            Featuring Starlink connectivity and cutting-edge validation technology.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4 text-sm animate-fade-in-up animation-delay-400">
          <span className="px-4 py-2 bg-green-100 border border-green-300 rounded-full text-green-700 font-medium hover:bg-green-200 transition-all duration-300 transform hover:scale-105">
            🌱 Carbon Neutral
          </span>
          <span className="px-4 py-2 bg-purple-100 border border-purple-300 rounded-full text-purple-700 font-medium hover:bg-purple-200 transition-all duration-300 transform hover:scale-105">
            🛰️ Starlink Ready
          </span>
          <span className="px-4 py-2 bg-violet-100 border border-violet-300 rounded-full text-violet-700 font-medium hover:bg-violet-200 transition-all duration-300 transform hover:scale-105">
            ⚡ High Performance
          </span>
        </div>
      </div>

      {/* Product Image Section */}
      <div className="relative animate-fade-in-up animation-delay-600">
        <div className="bg-white/80 border border-gray-200 rounded-2xl p-8 backdrop-blur-lg hover:border-gray-300 transition-all duration-500 group shadow-xl">
          <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl relative overflow-hidden border border-gray-200">
            {/* Image Placeholder - Replace this div with <img> tag when you have the image */}
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-50 via-violet-50 to-slate-50">
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-r from-purple-600 to-violet-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl transform group-hover:scale-110 transition-transform duration-500">
                  <Cpu className="w-16 h-16 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">Dione Validator Unit</h3>
                <p className="text-gray-600 text-lg font-light max-w-md mx-auto">Enterprise-grade hardware designed for the future of validation</p>
                
                {/* Placeholder text - remove when adding real image */}
                <div className="mt-8 px-6 py-3 bg-gray-100 border border-gray-300 rounded-lg inline-block">
                  <p className="text-gray-600 text-sm font-medium">📷 Image Placeholder</p>
                  <p className="text-gray-500 text-xs mt-1">Replace this section with your Dione validator image</p>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-6 right-6 w-20 h-20 bg-green-200/50 rounded-full animate-pulse group-hover:bg-green-200/70 transition-colors duration-500"></div>
            <div className="absolute bottom-6 left-6 w-16 h-16 bg-purple-200/50 rounded-full animate-pulse delay-1000 group-hover:bg-purple-200/70 transition-colors duration-500"></div>
            <div className="absolute top-1/2 left-6 w-12 h-12 bg-violet-200/50 rounded-full animate-pulse delay-500 group-hover:bg-violet-200/70 transition-colors duration-500"></div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up animation-delay-800">
        {features.map((feature, index) => (
          <div
            key={index}
           className="bg-white/80 backdrop-blur-lg border border-gray-200 rounded-xl p-6 hover:bg-white transition-all duration-300 transform hover:scale-105 group animate-fade-in-up shadow-lg"
            style={{ animationDelay: `${1000 + index * 100}ms` }}
          >
            <div className="flex items-start gap-4">
             <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-violet-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <div>
               <h3 className="text-lg font-semibold text-gray-900 mb-2 tracking-tight">{feature.title}</h3>
               <p className="text-gray-600 text-sm leading-relaxed font-light">{feature.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Specifications */}
      <div id="specs" className="bg-white/80 backdrop-blur-lg border border-gray-200 rounded-2xl p-8 animate-fade-in-up animation-delay-1200 hover:border-gray-300 transition-all duration-500 shadow-xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center tracking-tight">Technical Specifications</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 tracking-tight">Hardware</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 font-light">Processor:</span>
                <span className="text-gray-900 font-medium">ARM Cortex-A78 Octa-core</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-light">Memory:</span>
                <span className="text-gray-900 font-medium">32GB LPDDR5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-light">Storage:</span>
                <span className="text-gray-900 font-medium">1TB NVMe SSD</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-light">Power:</span>
                <span className="text-gray-900 font-medium">Solar + Wind Hybrid</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 tracking-tight">Network</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 font-light">Primary:</span>
                <span className="text-gray-900 font-medium">Starlink Satellite</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-light">Backup:</span>
                <span className="text-gray-900 font-medium">4G/5G Cellular</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-light">Uptime:</span>
                <span className="text-gray-900 font-medium">99.9% Guaranteed</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-light">Monitoring:</span>
                <span className="text-gray-900 font-medium">24/7 Remote Access</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div className="text-center animate-fade-in-up animation-delay-1400">
        <div className="inline-block bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-200 rounded-2xl p-8 hover:border-purple-300 transition-all duration-500 transform hover:scale-105 shadow-xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">Complete Validator Package</h2>
          <div className="text-5xl font-bold text-gradient mb-4 tracking-tight">
            1,200 USDT
          </div>
          <p className="text-gray-600 mb-6 font-light">One-time payment • Free shipping worldwide</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center justify-center gap-2 text-green-700 font-medium">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              Hardware & Setup
            </div>
            <div className="flex items-center justify-center gap-2 text-purple-700 font-medium">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              Starlink Integration
            </div>
            <div className="flex items-center justify-center gap-2 text-violet-700 font-medium">
              <div className="w-2 h-2 bg-violet-400 rounded-full"></div>
              Lifetime Support
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};