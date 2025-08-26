import React from 'react';
import { CheckCircle, Copy, Mail, X } from 'lucide-react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderData: any;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose, orderData }) => {
  const [emailSent, setEmailSent] = React.useState(false);

  React.useEffect(() => {
    if (isOpen) {
      // Simulate sending confirmation email
      setTimeout(() => {
        setEmailSent(true);
      }, 1500);
    }
  }, [isOpen]);

  const copyOrderId = () => {
    navigator.clipboard.writeText(orderData?.orderId || '');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/95 backdrop-blur-lg rounded-2xl border border-gray-200 p-8 max-w-md w-full shadow-2xl">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Confirmed!</h2>
          <p className="text-gray-700 mb-6">
            Your Dione validator order has been successfully processed.
          </p>
          
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6 text-left">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Order ID:</span>
                <div className="flex items-center gap-2">
                  <span className="text-gray-900 font-mono text-sm">{orderData?.orderId}</span>
                  <button
                    onClick={copyOrderId}
                    className="text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Amount:</span>
                <span className="text-gray-900 font-semibold">{orderData?.amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Customer:</span>
                <span className="text-gray-900">{orderData?.fullName}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-3">
              <Mail className={`w-5 h-5 ${emailSent ? 'text-green-400' : 'text-purple-400'}`} />
              <div className="text-left">
                <p className="text-gray-900 font-medium">
                  {emailSent ? 'Confirmation Email Sent!' : 'Sending Confirmation Email...'}
                </p>
                <p className="text-gray-600 text-sm">
                  Check your inbox at {orderData?.email}
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-left mb-6">
            <h3 className="text-gray-900 font-semibold mb-2">What's Next?</h3>
            <ul className="text-gray-600 text-sm space-y-1">
              <li>• Your Dione validator will be shipped within 5-7 business days</li>
              <li>• You'll receive tracking information via email</li>
              <li>• Setup instructions will be included in the package</li>
              <li>• 24/7 technical support is available after delivery</li>
            </ul>
          </div>
          
          <button
            onClick={onClose}
           className="w-full py-3 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-[1.02]"
          >
            Continue
          </button>
        </div>
        
        <button
          onClick={onClose}
         className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};