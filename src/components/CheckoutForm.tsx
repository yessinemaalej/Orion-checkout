import React, { useState, useEffect } from 'react';
import { MapPin, Phone, User, Wallet, Mail, Loader, AlertCircle, CheckCircle, ExternalLink } from 'lucide-react';

interface CheckoutFormProps {
  onPaymentComplete: (orderData: any) => void;
}

declare global {
  interface Window {
    ethereum?: any;
  }
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
    country: ''
  });
  
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false);

  // Recipient wallet address for payments
  const RECIPIENT_WALLET = '0x742d35Cc6632C0532925a3b8D24E6745C4B5A23E';
  const PAYMENT_AMOUNT = '1200'; // 1200 USDT

  useEffect(() => {
    checkWalletConnection();
  }, []);

  const checkWalletConnection = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          setIsConnected(true);
          setWalletAddress(accounts[0]);
        }
      } catch (error) {
        console.error('Error checking wallet connection:', error);
      }
    }
  };

  const connectWallet = async () => {
    if (typeof window.ethereum === 'undefined') {
      setError('MetaMask is not installed. Please install MetaMask to continue.');
      return;
    }

    try {
      setError('');
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });
      
      if (accounts.length > 0) {
        setIsConnected(true);
        setWalletAddress(accounts[0]);
      }
    } catch (error: any) {
      setError('Failed to connect wallet. Please try again.');
      console.error('Wallet connection error:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const isFormValid = () => {
    const requiredFields = ['fullName', 'email', 'phone', 'address', 'city', 'state', 'zipCode', 'country'];
    return requiredFields.every(field => formData[field].trim() !== '') && 
           isConnected && 
           agreedToTerms && 
           agreedToPrivacy;
  };

  const handlePayment = async () => {
    if (!isFormValid()) {
      setError('Please fill in all required fields, connect your wallet, and agree to the terms.');
      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      // USDT Contract Address on Ethereum Mainnet
      const USDT_CONTRACT = '0xdAC17F958D2ee523a2206206994597C13D831ec7';
      
      // Convert amount to wei (USDT has 6 decimals)
      const amountInWei = (parseFloat(PAYMENT_AMOUNT) * 1000000).toString(16);
      
      // ERC-20 transfer function signature
      const transferFunction = '0xa9059cbb';
      const recipientPadded = RECIPIENT_WALLET.slice(2).padStart(64, '0');
      const amountPadded = amountInWei.padStart(64, '0');
      const data = transferFunction + recipientPadded + amountPadded;

      const transactionParameters = {
        to: USDT_CONTRACT,
        from: walletAddress,
        data: data,
        gas: '0x186A0', // 100000 gas limit
      };

      const txHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
      });

      // Wait for transaction confirmation (simplified)
      await new Promise(resolve => setTimeout(resolve, 2000));

      const orderData = {
        ...formData,
        orderId: `ORION-${Date.now()}`,
        amount: `${PAYMENT_AMOUNT} USDT`,
        walletAddress: walletAddress,
        transactionHash: txHash,
        timestamp: new Date().toISOString()
      };
      
      setIsProcessing(false);
      onPaymentComplete(orderData);
    } catch (error: any) {
      setIsProcessing(false);
      if (error.code === 4001) {
        setError('Transaction was rejected by user.');
      } else {
        setError('Payment failed. Please try again.');
      }
      console.error('Payment error:', error);
    }
  };

  return (
    <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-8 border border-gray-200 shadow-xl">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 tracking-tight">Order Your Dione Validator</h2>
      
      <div className="space-y-6">
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
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
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

        {/* Wallet Connection */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 tracking-tight">
            <Wallet className="w-5 h-5" />
            Wallet Connection
          </h3>
          
          {!isConnected ? (
            <button
              onClick={connectWallet}
              className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              <Wallet className="w-5 h-5" />
              Connect MetaMask Wallet
            </button>
          ) : (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-green-800 font-medium">Wallet Connected</p>
                  <p className="text-green-600 text-sm font-mono">
                    {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                  </p>
                </div>
              </div>
            </div>
          )}
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
                <p className="text-gray-600 text-sm font-light">Pay with Tether (USDT) via MetaMask</p>
              </div>
            </div>
            
            <div className="bg-gray-100 rounded-lg p-3 mb-3">
              <p className="text-gray-700 text-sm mb-1 font-medium">Payment will be sent to:</p>
              <p className="text-gray-900 font-mono text-sm break-all">
                {RECIPIENT_WALLET}
              </p>
            </div>
            
            <div className="text-center">
              <span className="text-2xl font-bold text-gray-900 tracking-tight">1,200 USDT</span>
              <p className="text-gray-600 text-sm font-light">One-time payment</p>
            </div>
          </div>
        </div>

        {/* Terms and Privacy Agreement */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 tracking-tight">
            Terms & Conditions
          </h3>
          
          <div className="space-y-3">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-1 w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              />
              <span className="text-sm text-gray-700">
                I agree to the{' '}
                <a
                  href="/terms-of-service.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 hover:text-purple-700 underline font-medium inline-flex items-center gap-1"
                >
                  Terms of Service
                  <ExternalLink className="w-3 h-3" />
                </a>
                {' '}*
              </span>
            </label>
            
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agreedToPrivacy}
                onChange={(e) => setAgreedToPrivacy(e.target.checked)}
                className="mt-1 w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              />
              <span className="text-sm text-gray-700">
                I agree to the{' '}
                <a
                  href="/privacy-policy.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 hover:text-purple-700 underline font-medium inline-flex items-center gap-1"
                >
                  Privacy Policy
                  <ExternalLink className="w-3 h-3" />
                </a>
                {' '}*
              </span>
            </label>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {/* Submit Button */}
        <div className="pt-6">
          <button
            onClick={handlePayment}
            disabled={!isFormValid() || isProcessing}
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
                Pay 1,200 USDT
              </>
            )}
          </button>
          
          <p className="text-gray-500 text-xs text-center mt-3 font-light">
            Secure payment processed through MetaMask
          </p>
        </div>
      </div>
    </div>
  );
};