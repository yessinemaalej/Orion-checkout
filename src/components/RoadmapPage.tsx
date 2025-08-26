import React from 'react';
import { Calendar, CheckCircle, Clock, Zap, Globe, Shield, Cpu, Rocket, Users, Building } from 'lucide-react';

export const RoadmapPage: React.FC = () => {
  const roadmapItems = [
    {
      phase: "Phase 1",
      title: "Foundation & Development",
      period: "Q1 2024 - Q2 2024",
      status: "completed",
      items: [
        "Core blockchain architecture development",
        "Consensus mechanism implementation",
        "Basic validator node software",
        "Initial testnet deployment",
        "Security audit completion"
      ]
    },
    {
      phase: "Phase 2", 
      title: "Validator Hardware & Integration",
      period: "Q3 2024 - Q4 2024",
      status: "completed",
      items: [
        "Orion validator hardware design",
        "Renewable energy integration",
        "Starlink connectivity implementation",
        "Remote monitoring system",
        "Beta testing program launch"
      ]
    },
    {
      phase: "Phase 3",
      title: "Mainnet Launch & Ecosystem",
      period: "Q1 2025 - Q2 2025", 
      status: "current",
      items: [
        "Odyssey Chain mainnet launch",
        "Validator network deployment",
        "Dione Portal ecosystem launch",
        "Community governance implementation",
        "Developer tools and APIs"
      ]
    },
    {
      phase: "Phase 4",
      title: "Global Expansion",
      period: "Q3 2025 - Q4 2025",
      status: "upcoming",
      items: [
        "International validator deployment",
        "Multi-chain interoperability",
        "Enterprise partnerships",
        "Advanced DeFi protocols",
        "Mobile application launch"
      ]
    },
    {
      phase: "Phase 5",
      title: "Advanced Features",
      period: "Q1 2026 - Q2 2026",
      status: "upcoming", 
      items: [
        "AI-powered network optimization",
        "Cross-chain bridge protocols",
        "Advanced governance mechanisms",
        "Institutional validator services",
        "Global sustainability initiatives"
      ]
    },
    {
      phase: "Phase 6",
      title: "Ecosystem Maturity",
      period: "Q3 2026+",
      status: "future",
      items: [
        "Fully decentralized governance",
        "1000+ active validators globally",
        "Carbon-negative network operation",
        "Advanced smart contract capabilities",
        "Next-generation consensus mechanisms"
      ]
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'current':
        return <Zap className="w-6 h-6 text-purple-500 animate-pulse" />;
      case 'upcoming':
        return <Clock className="w-6 h-6 text-blue-500" />;
      case 'future':
        return <Rocket className="w-6 h-6 text-gray-400" />;
      default:
        return <Clock className="w-6 h-6 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 border-green-300 text-green-800';
      case 'current':
        return 'bg-purple-100 border-purple-300 text-purple-800';
      case 'upcoming':
        return 'bg-blue-100 border-blue-300 text-blue-800';
      case 'future':
        return 'bg-gray-100 border-gray-300 text-gray-600';
      default:
        return 'bg-gray-100 border-gray-300 text-gray-600';
    }
  };

  const milestones = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Security First",
      description: "Multi-layer security audits and continuous monitoring",
      color: "from-red-500 to-pink-500"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Network",
      description: "Worldwide validator deployment for maximum decentralization",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Cpu className="w-8 h-8" />,
      title: "High Performance",
      description: "Enterprise-grade hardware for optimal network efficiency",
      color: "from-purple-500 to-violet-500"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community Driven",
      description: "Decentralized governance by validator community",
      color: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-gray-200 bg-white/80 backdrop-blur-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-gradient mb-6 tracking-tight">
                Dione Roadmap
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-light">
                Our journey to building the world's most sustainable and decentralized validator network
              </p>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Milestones */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12 tracking-tight">
              Our Core Principles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className="bg-white/80 backdrop-blur-lg border border-gray-200 rounded-xl p-6 text-center hover:border-gray-300 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${milestone.color} rounded-full flex items-center justify-center mx-auto mb-4 text-white`}>
                    {milestone.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 tracking-tight">
                    {milestone.title}
                  </h3>
                  <p className="text-gray-600 text-sm font-light">
                    {milestone.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Roadmap Timeline */}
          <div className="space-y-12">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12 tracking-tight">
              Development Timeline
            </h2>
            
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-violet-500 to-gray-300"></div>
              
              {roadmapItems.map((item, index) => (
                <div key={index} className="relative flex items-start mb-16 last:mb-0">
                  {/* Timeline Node */}
                  <div className="absolute left-6 w-4 h-4 bg-white border-4 border-purple-500 rounded-full z-10"></div>
                  
                  {/* Content */}
                  <div className="ml-20 flex-1">
                    <div className="bg-white/95 backdrop-blur-lg border border-gray-200 rounded-2xl p-8 shadow-xl hover:border-gray-300 transition-all duration-500">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                          {getStatusIcon(item.status)}
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900 tracking-tight">
                              {item.phase}: {item.title}
                            </h3>
                            <div className="flex items-center gap-3 mt-2">
                              <Calendar className="w-4 h-4 text-gray-500" />
                              <span className="text-gray-600 font-medium">{item.period}</span>
                            </div>
                          </div>
                        </div>
                        <span className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(item.status)}`}>
                          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                        </span>
                      </div>
                      
                      {/* Items */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {item.items.map((subItem, subIndex) => (
                          <div
                            key={subIndex}
                            className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            <div className={`w-2 h-2 rounded-full ${
                              item.status === 'completed' ? 'bg-green-400' :
                              item.status === 'current' ? 'bg-purple-400' :
                              item.status === 'upcoming' ? 'bg-blue-400' : 'bg-gray-400'
                            }`}></div>
                            <span className="text-gray-700 text-sm font-medium">{subItem}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-20 text-center">
            <div className="bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-200 rounded-2xl p-12 hover:border-purple-300 transition-all duration-500">
              <Building className="w-16 h-16 text-purple-600 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">
                Join the Future of Validation
              </h2>
              <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto font-light">
                Be part of the world's first renewable energy-powered validator network. 
                Order your Orion validator today and help build a sustainable blockchain future.
              </p>
              <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 tracking-tight">
                Order Your Validator
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};