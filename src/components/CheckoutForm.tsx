import React, { useState, useEffect } from 'react';
import { MapPin, Phone, User, Wallet, Mail, Loader, AlertCircle, CheckCircle, ExternalLink } from 'lucide-react';

interface CheckoutFormProps {
  onPaymentComplete: (orderData: any) => void;
}

type BlockchainNetwork = 'ethereum' | 'binance';

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
  
  const [selectedNetwork, setSelectedNetwork] = useState<BlockchainNetwork>('ethereum');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false);

  // Network configurations
  const networkConfig = {
    ethereum: {
      chainId: '0x1', // Ethereum Mainnet
      chainName: 'Ethereum Mainnet',
      usdtContract: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      recipientWallet: '0x742d35Cc6632C0532925a3b8D24E6745C4B5A23E',
      decimals: 6,
      rpcUrl: 'https://mainnet.infura.io/v3/',
      blockExplorer: 'https://etherscan.io'
    },
    binance: {
      chainId: '0x38', // BSC Mainnet
      chainName: 'Binance Smart Chain',
      usdtContract: '0x55d398326f99059fF775485246999027B3197955',
      recipientWallet: '0x742d35Cc6632C0532925a3b8D24E6745C4B5A23E',
      decimals: 18,
      rpcUrl: 'https://bsc-dataseed.binance.org/',
      blockExplorer: 'https://bscscan.com'
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
           agreedToTerms && 
           agreedToPrivacy;
  };

  const handleConnectAndPay = async () => {
    if (!isFormValid()) {
      setError('Please fill in all required fields and agree to the terms.');
      return;
    }

    if (typeof window.ethereum === 'undefined') {
      setError('MetaMask is not installed. Please install MetaMask to continue.');
      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      const config = networkConfig[selectedNetwork];
      
      // Connect wallet
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });
      
      if (accounts.length === 0) {
        throw new Error('No accounts found');
      }

      const walletAddress = accounts[0];

      // Switch to correct network
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: config.chainId }],
        });
      } catch (switchError: any) {
        // Network doesn't exist, add it
        if (switchError.code === 4902) {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: config.chainId,
              chainName: config.chainName,
              rpcUrls: [config.rpcUrl],
              blockExplorerUrls: [config.blockExplorer]
            }],
          });
        } else {
          throw switchError;
        }
      }
      
      // Convert amount based on network decimals
      const paymentAmount = 1200;
      const amountInWei = (paymentAmount * Math.pow(10, config.decimals)).toString(16);
      
      // ERC-20 transfer function signature
      const transferFunction = '0xa9059cbb';
      const recipientPadded = config.recipientWallet.slice(2).padStart(64, '0');
      const amountPadded = amountInWei.padStart(64, '0');
      const data = transferFunction + recipientPadded + amountPadded;

      const transactionParameters = {
        to: config.usdtContract,
        from: walletAddress,
        data: data,
        gas: selectedNetwork === 'ethereum' ? '0x186A0' : '0x7530', // Different gas limits
      };

      const txHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
      });

      const orderData = {
        ...formData,
        orderId: `ORION-${Date.now()}`,
        amount: `${paymentAmount} USDT`,
        network: selectedNetwork,
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
      } else if (error.code === -32602) {
        setError('Invalid transaction parameters. Please try again.');
      } else {
        setError(`Payment failed: ${error.message || 'Please try again.'}`);
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

        {/* Network Selection */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 tracking-tight">
            <Wallet className="w-5 h-5" />
            Payment Network
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className={`cursor-pointer border-2 rounded-lg p-4 transition-all ${
              selectedNetwork === 'ethereum' 
                ? 'border-purple-500 bg-purple-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}>
              <input
                type="radio"
                name="network"
                value="ethereum"
                checked={selectedNetwork === 'ethereum'}
                onChange={(e) => setSelectedNetwork(e.target.value as BlockchainNetwork)}
                className="sr-only"
              />
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">Ξ</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Ethereum</p>
                  <p className="text-gray-600 text-sm">ERC-20 USDT</p>
                </div>
              </div>
            </label>
            
            <label className={`cursor-pointer border-2 rounded-lg p-4 transition-all ${
              selectedNetwork === 'binance' 
                ? 'border-purple-500 bg-purple-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}>
              <input
                type="radio"
                name="network"
                value="binance"
                checked={selectedNetwork === 'binance'}
                onChange={(e) => setSelectedNetwork(e.target.value as BlockchainNetwork)}
                className="sr-only"
              />
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">B</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Binance Smart Chain</p>
                  <p className="text-gray-600 text-sm">BEP-20 USDT</p>
                </div>
              </div>
            </label>
          </div>
          
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
            <p className="text-gray-700 text-sm mb-1 font-medium">Payment will be sent to:</p>
            <p className="text-gray-900 font-mono text-sm break-all">
              {networkConfig[selectedNetwork].recipientWallet}
            </div>
          </div>
        </div>

        {/* Payment Information */}
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-200 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-black font-bold text-sm">₮</span>
              </div>
              <div>
                <p className="text-gray-900 font-semibold tracking-tight">
                  USDT Payment on {selectedNetwork === 'ethereum' ? 'Ethereum' : 'Binance Smart Chain'}
                </p>
                <p className="text-gray-600 text-sm font-light">
                  {selectedNetwork === 'ethereum' ? 'ERC-20' : 'BEP-20'} USDT via MetaMask
                </p>
              </div>
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
            onClick={handleConnectAndPay}
            disabled={!isFormValid() || isProcessing}
            className="w-full py-4 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 disabled:from-gray-500 disabled:to-gray-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2 tracking-tight"
          >
            {isProcessing ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                Connecting & Processing...
              </>
            ) : (
              <>
                <Wallet className="w-5 h-5" />
                Connect MetaMask & Pay 1,200 USDT
              </>
            )}
          </button>
          
          <p className="text-gray-500 text-xs text-center mt-3 font-light">
            Secure payment on {selectedNetwork === 'ethereum' ? 'Ethereum' : 'Binance Smart Chain'} via MetaMask
          </p>
        </div>
      </div>
    </div>
  );
};