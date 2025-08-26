import React, { useState } from 'react';
import { MapPin, Phone, User, Wallet, Mail, Loader } from 'lucide-react';

interface CheckoutFormProps {
  onPaymentComplete: (orderData: any) => void;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({ onPaymentComplete }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    walletAddress: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      const orderData = {
        ...formData,
        orderId: `ORION-${Date.now()}`,
        amount: '2,500 USDT',
        timestamp: new Date().toISOString()
      };
      
      setIsProcessing(false);
      onPaymentComplete(orderData);
    }, 3000);
  };

  return (
    <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-8 border border-gray-200 shadow-xl">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 tracking-tight">Order Your Dione Validator</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 tracking-tight">
            <User className="w-5 h-5" />
            Personal Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 tracking-tight">
                Full Name *
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="John Doe"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 tracking-tight">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="john@example.com"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 tracking-tight">
              Phone Number *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="+1 (555) 123-4567"
            />
          </div>
        </div>

        {/* Shipping Address */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 tracking-tight">
            <MapPin className="w-5 h-5" />
            Shipping Address
          </h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 tracking-tight">
              Street Address *
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="123 Main Street"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
             <label className="block text-sm font-medium text-gray-700 mb-2 tracking-tight">
                City *
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
               className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="New York"
              />
            </div>
            
            <div>
             <label className="block text-sm font-medium text-gray-700 mb-2 tracking-tight">
                State/Province *
              </label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                required
               className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="NY"
              />
            </div>
            
            <div>
             <label className="block text-sm font-medium text-gray-700 mb-2 tracking-tight">
                ZIP Code *
              </label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                required
               className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="10001"
              />
            </div>
          </div>
          
          <div>
           <label className="block text-sm font-medium text-gray-700 mb-2 tracking-tight">
              Country *
            </label>
            <select
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              required
             className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            >
              <option value="">Select Country</option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="UK">United Kingdom</option>
              <option value="AU">Australia</option>
              <option value="DE">Germany</option>
              <option value="FR">France</option>
              <option value="JP">Japan</option>
              <option value="SG">Singapore</option>
            </select>
          </div>
        </div>

        {/* Payment Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 tracking-tight">
            <Wallet className="w-5 h-5" />
            Payment Information
          </h3>
          
          <div className="bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-200 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-black font-bold text-sm">₮</span>
              </div>
              <div>
               <p className="text-gray-900 font-semibold tracking-tight">USDT Payment</p>
               <p className="text-gray-600 text-sm font-light">Pay with Tether (USDT)</p>
              </div>
            </div>
            
           <div className="bg-gray-100 rounded-lg p-3 mb-3">
             <p className="text-gray-700 text-sm mb-1 font-medium">Send payment to:</p>
             <p className="text-gray-900 font-mono text-sm break-all">
                0x742d35Cc6632C0532925a3b8D24E6745C4B5A23E
              </p>
            </div>
            
            <div className="text-center">
             <span className="text-2xl font-bold text-gray-900 tracking-tight">1,200 USDT</span>
             <p className="text-gray-600 text-sm font-light">One-time payment</p>
            </div>
          </div>
          
          <div>
           <label className="block text-sm font-medium text-gray-700 mb-2 tracking-tight">
              Your USDT Wallet Address *
            </label>
            <input
              type="text"
              name="walletAddress"
              value={formData.walletAddress}
              onChange={handleInputChange}
              required
             className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all font-mono text-sm"
              placeholder="0x..."
            />
           <p className="text-gray-500 text-xs mt-1 font-light">
              We'll use this address to verify your payment and send confirmation
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-6">
          <button
            type="submit"
            disabled={isProcessing}
           className="w-full py-4 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 disabled:from-gray-500 disabled:to-gray-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2 tracking-tight"
          >
            {isProcessing ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                Processing Payment...
              </>
            ) : (
              <>
                <Wallet className="w-5 h-5" />
                Complete Order - 1,200 USDT
              </>
            )}
          </button>
          
         <p className="text-gray-500 text-xs text-center mt-3 font-light">
            By completing your order, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </form>
    </div>
  );
};