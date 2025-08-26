import React, { useState } from 'react';
import { ProductOverview } from './components/ProductOverview';
import { CheckoutForm } from './components/CheckoutForm';
import { ConfirmationModal } from './components/ConfirmationModal';
import { Navigation } from './components/Navigation';

function App() {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [orderData, setOrderData] = useState(null);

  const handlePaymentComplete = (data: any) => {
    setOrderData(data);
    setShowConfirmation(true);
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
    setOrderData(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-slate-500/3 rounded-full blur-3xl"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-gray-200 bg-white/80 backdrop-blur-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-violet-600 rounded-lg flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-lg tracking-tight">D</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900 tracking-tight">Dione Portal</h1>
                  <p className="text-gray-600 text-sm font-light">Ecosystem Portal</p>
                </div>
              </div>
              
              <div className="flex items-center gap-8">
                <Navigation />
                <div className="hidden lg:flex items-center gap-4 text-xs text-gray-500 font-light">
                  <span className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    24/7 Support
                  </span>
                  <span>•</span>
                  <span>Free Shipping</span>
                  <span>•</span>
                  <span>1 Year Warranty</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Product Overview */}
            <div className="lg:col-span-2">
              <ProductOverview />
            </div>
            
            {/* Checkout Form */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <CheckoutForm onPaymentComplete={handlePaymentComplete} />
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-200 bg-white/80 backdrop-blur-lg mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center text-gray-500 text-sm font-light">
              <p>© 2025 Dione Portal. All rights reserved.</p>
              <p className="mt-2">Secure • Sustainable • Reliable</p>
            </div>
          </div>
        </footer>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={handleCloseConfirmation}
        orderData={orderData}
      />
    </div>
  );
}

export default App;