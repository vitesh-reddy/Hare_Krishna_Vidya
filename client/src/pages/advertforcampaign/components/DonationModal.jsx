import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle,DialogClose } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';


import { X, Heart, CreditCard, Smartphone, Building, Loader2, AlertCircle } from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';

import { initiateRazorpayPayment } from '../../../PaymentService';
import toast from 'react-hot-toast';

export const DonationModal = ({ isOpen, onClose, campaign }) => {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [donorInfo, setDonorInfo] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [step, setStep] = useState(1);
  const [isSaving, setIsSaving] = useState(false);

  // Validation states
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const predefinedAmounts = [100, 250, 500, 1000, 2500, 5000];

  // Validation rules
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[6-9]\d{9}$/; // Indian mobile number format
    return phone === '' || phoneRegex.test(phone.replace(/\s+/g, ''));
  };

  const validateName = (name) => {
    return name.trim().length >= 2 && /^[a-zA-Z\s]+$/.test(name.trim());
  };
  

  const validateAmount = (amount) => {
    const numAmount = parseFloat(amount);
    return numAmount >= 10 && numAmount <= 100000;
  };

  // Real-time validation
  const validateField = (fieldName, value) => {
    const newErrors = { ...errors };

    switch (fieldName) {
      case 'amount':
        // For predefined amounts, value is the amount itself
        const amountToValidate = value || getCurrentAmount();
        if (amountToValidate < 10) {
          newErrors.amount = 'Minimum donation amount is ₹10';
        } else if (amountToValidate > 100000) {
          newErrors.amount = 'Maximum donation amount is ₹1,00,000';
        } else {
          delete newErrors.amount;
        }
        break;

      case 'customAmount':
        if (value && !validateAmount(value)) {
          if (parseFloat(value) < 10) {
            newErrors.customAmount = 'Minimum amount is ₹10';
          } else if (parseFloat(value) > 100000) {
            newErrors.customAmount = 'Maximum amount is ₹1,00,000';
          } else if (isNaN(parseFloat(value))) {
            newErrors.customAmount = 'Please enter a valid amount';
          }
        } else {
          delete newErrors.customAmount;
        }
        break;

      case 'name':
        if (!value.trim()) {
          newErrors.name = 'Full name is required';
        } else if (!validateName(value)) {
          newErrors.name = 'Please enter a valid name (minimum 2 characters, letters only)';
        } else {
          delete newErrors.name;
        }
        break;

      case 'email':
        if (!value.trim()) {
          newErrors.email = 'Email address is required';
        } else if (!validateEmail(value)) {
          newErrors.email = 'Please enter a valid email address';
        } else {
          delete newErrors.email;
        }
        break;

      case 'phone':
        if (value && !validatePhone(value)) {
          newErrors.phone = 'Please enter a valid 10-digit mobile number';
        } else {
          delete newErrors.phone;
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount('');
    // Clear any existing amount errors when selecting a valid predefined amount
    const newErrors = { ...errors };
    delete newErrors.amount;
    delete newErrors.customAmount;
    setErrors(newErrors);
    setTouched({ ...touched, amount: true });
  };

  const handleCustomAmountChange = (value) => {
    setCustomAmount(value);
    setSelectedAmount(null);
    setTouched({ ...touched, customAmount: true });
    validateField('customAmount', value);
  };

  const handleInputChange = (field, value) => {
    setDonorInfo({ ...donorInfo, [field]: value });
    setTouched({ ...touched, [field]: true });

    // Debounced validation for better UX
    setTimeout(() => {
      if (touched[field]) {
        validateField(field, value);
      }
    }, 300);
  };

  const handleInputBlur = (field, value) => {
    setTouched({ ...touched, [field]: true });
    validateField(field, value);
  };

  const getCurrentAmount = () => {
    return selectedAmount || parseInt(customAmount) || 0;
  };

  const validateStep = (stepNumber) => {
    let isValid = true;
    const newErrors = { ...errors };
    const newTouched = { ...touched };

    if (stepNumber === 1) {
      const currentAmount = getCurrentAmount();

      if (currentAmount < 10) {
        newErrors.amount = 'Minimum donation amount is ₹10';
        isValid = false;
      } else if (currentAmount > 100000) {
        newErrors.amount = 'Maximum donation amount is ₹1,00,000';
        isValid = false;
      } else {
        // Clear amount errors if amount is valid
        delete newErrors.amount;
      }

      // Only validate custom amount if it's being used
      if (customAmount && !selectedAmount) {
        newTouched.customAmount = true;
        if (!validateAmount(customAmount)) {
          newErrors.customAmount = 'Please enter a valid amount';
          isValid = false;
        }
      }
    }

    if (stepNumber === 2) {
      // Validate name
      newTouched.name = true;
      if (!donorInfo.name.trim()) {
        newErrors.name = 'Full name is required';
        isValid = false;
      } else if (!validateName(donorInfo.name)) {
        newErrors.name = 'Please enter a valid name (minimum 2 characters, letters only)';
        isValid = false;
      }

      // Validate email
      newTouched.email = true;
      if (!donorInfo.email.trim()) {
        newErrors.email = 'Email address is required';
        isValid = false;
      } else if (!validateEmail(donorInfo.email)) {
        newErrors.email = 'Please enter a valid email address';
        isValid = false;
      }

      // Validate phone (optional but if provided, must be valid)
      if (donorInfo.phone) {
        newTouched.phone = true;
        if (!validatePhone(donorInfo.phone)) {
          newErrors.phone = 'Please enter a valid 10-digit mobile number';
          isValid = false;
        }
      }
    }

    setErrors(newErrors);
    setTouched(newTouched);
    return isValid;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      if (step < 3) {
        setStep(step + 1);
      }
    } else {
      // Show validation toast with correct syntax
      toast.error('Please fix the errors before continuing');
    }
  };

  const handleContinue = async () => {
    if (!validateStep(2)) {
      toast.error('Please fix the errors before continuing');
      return;
    }

    try {
      setIsSaving(true);
      const baseUrl = import.meta.env.VITE_BACKEND_URL;
      const response = await fetch(`${baseUrl}/api/payments/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: (selectedAmount || parseInt(customAmount)) * 100, // Convert to paise
          currency: 'INR',
          donationType: 'campaign',
        }),
      });

      // Debug: Log the response status and headers
      console.log('Create Order Response Status:', response.status);
      console.log('Create Order Response Headers:', response.headers);

      // Debug: Log the raw response body
      const responseText = await response.text();
      console.log('Create Order Response Body:', responseText);

      // Parse the response body as JSON
      let orderData;
      try {
        orderData = JSON.parse(responseText);
      } catch (parseError) {
        console.error('JSON Parse Error:', parseError);
        throw new Error('Failed to parse create-order response: ' + parseError.message);
      }

      if (!response.ok) {
        throw new Error(orderData.error || 'Failed to create payment order');
      }

      initiateRazorpayPayment(
        {
          orderId: orderData.orderId,
          amount: (selectedAmount || parseInt(customAmount)) * 100,
          donorName: donorInfo.name,
          email: donorInfo.email,
          phone: donorInfo.phone,
        },
        async (paymentResponse) => {
          const verifyResponse = await fetch(`${baseUrl}/api/payments/verify-payment`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              orderId: orderData.orderId,
              paymentId: paymentResponse.razorpay_payment_id,
              signature: paymentResponse.razorpay_signature,
              donationData: {
                donorInfo: {
                  name: donorInfo.name,
                  email: donorInfo.email,
                  phone: donorInfo.phone,
                },
                donationType: 'amount',
                amount: selectedAmount || parseInt(customAmount),
                paymentDetails: {
                  orderId: orderData.orderId,
                  paymentId: paymentResponse.razorpay_payment_id,
                  signature: paymentResponse.razorpay_signature,
                },
              },
              campaignId: campaign._id
            }),
          });

          // Debug: Log the verify response
          console.log('Verify Payment Response Status:', verifyResponse.status);
          const verifyResponseText = await verifyResponse.text();
          console.log('Verify Payment Response Body:', verifyResponseText);

          let verifyResult;
          try {
            verifyResult = JSON.parse(verifyResponseText);
          } catch (parseError) {
            console.error('JSON Parse Error (Verify):', parseError);
            throw new Error('Failed to parse verify-payment response: ' + parseError.message);
          }

          if (!verifyResponse.ok) {
            throw new Error(verifyResult.error || 'Payment verification failed');
          }

          // Success toast
          toast.success(`Thank you for donating ₹${getCurrentAmount()}! 🙏`);
        },
        (error) => {
          toast.error(error || 'Payment failed. Please try again.');
        }
      );
    } catch (error) {
      console.error('HandleContinue Error:', error);
      toast.error(error.message || 'An error occurred during payment.');
    } finally {
      setIsSaving(false);
      onClose();
    }
  };

  const handleDonate = () => {
    toast.success(`Thank you for donating ₹${getCurrentAmount()} to ${campaign?.name || 'the campaign'}! 🙏`);
    setStep(1);
    setSelectedAmount(null);
    setCustomAmount('');
    setDonorInfo({ name: '', email: '', phone: '', message: '' });
    setErrors({});
    setTouched({});
    onClose();
  };

  // Component for error message display
  const ErrorMessage = ({ error, touched }) => {
    if (!error || !touched) return null;
    return (
      <div className="flex items-center gap-1 text-red-500 text-xs mt-1">
        <AlertCircle className="w-3 h-3" />
        <span>{error}</span>
      </div>
    );
  };

  if (!campaign) return null;

  const progressPercentage = (campaign?.raisedAmount && campaign?.goalAmount)
    ? (campaign.raisedAmount / campaign.goalAmount) * 100
    : 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          className: '',
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            theme: {
              primary: 'green',
              secondary: 'black',
            },
          },
        }}
      />
      <DialogContent className="max-w-md mx-auto bg-white rounded-2xl shadow-2xl border-0 overflow-hidden" >
        
        <DialogHeader className="relative p-0">
          <div className="relative h-32 bg-gradient-to-br from-orange-400 via-amber-400 to-yellow-300">
            <img
              src={campaign?.uploadedImage || "/placeholder.jpg"}
              alt={campaign?.campaignName || "Campaign"}
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <DialogTitle className="text-lg font-bold mb-1">{campaign?.campaignName || "Campaign"}</DialogTitle>
            </div>
            
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full p-1 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div> 
        </DialogHeader>

        <div className="p-6">
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>₹{campaign?.raisedAmount?.toLocaleString() || 0} raised</span>
              <span>₹{campaign?.goalAmount?.toLocaleString() || 0} goal</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full transition-all"
                style={{ width: `${Math.min(progressPercentage, 100)}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">{Math.round(progressPercentage)}% completed</p>
          </div>

          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-500" />
                Choose Donation Amount
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {predefinedAmounts.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => handleAmountSelect(amount)}
                    className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${selectedAmount === amount
                      ? 'border-orange-500 bg-orange-50 text-orange-600'
                      : errors.amount && touched.amount
                        ? 'border-red-300 hover:border-red-400 text-gray-700'
                        : 'border-gray-200 hover:border-orange-300 text-gray-700'
                      }`}
                  >
                    ₹{amount}
                  </button>
                ))}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Or enter custom amount</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                  <Input
                    type="number"
                    placeholder="Enter amount"
                    value={customAmount}
                    onChange={(e) => handleCustomAmountChange(e.target.value)}
                    onBlur={(e) => handleInputBlur('customAmount', e.target.value)}
                    className={`pl-8 focus:border-orange-500 ${errors.customAmount && touched.customAmount
                      ? 'border-red-300 focus:border-red-500'
                      : 'border-gray-300'
                      }`}
                    min="10"
                    max="100000"
                  />
                </div>
                <ErrorMessage error={errors.customAmount} touched={touched.customAmount} />
              </div>

              <ErrorMessage error={errors.amount} touched={touched.amount} />

              <Button
                onClick={handleNext}
                disabled={getCurrentAmount() < 10 || (errors.amount || errors.customAmount || (customAmount >= (campaign.goalAmount - campaign.raisedAmount)))}
                className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white py-3 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue with ₹{getCurrentAmount()}
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">Donor Information</h3>
                <button onClick={() => setStep(1)} className="text-sm text-orange-600 hover:text-orange-700">
                  ← Back
                </button>
              </div>
              <div className="bg-orange-50 p-3 rounded-lg">
                <p className="text-sm text-orange-800">
                  <strong>Donation Amount:</strong> ₹{getCurrentAmount()}
                </p>
              </div>
              <div className="space-y-3">
                <div>
                  <Input
                    placeholder="Full Name *"
                    value={donorInfo.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    onBlur={(e) => handleInputBlur('name', e.target.value)}
                    className={`focus:border-orange-500 ${errors.name && touched.name
                      ? 'border-red-300 focus:border-red-500'
                      : 'border-gray-300'
                      }`}
                    required
                  />
                  <ErrorMessage error={errors.name} touched={touched.name} />
                </div>

                <div>
                  <Input
                    type="email"
                    placeholder="Email Address *"
                    value={donorInfo.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    onBlur={(e) => handleInputBlur('email', e.target.value)}
                    className={`focus:border-orange-500 ${errors.email && touched.email
                      ? 'border-red-300 focus:border-red-500'
                      : 'border-gray-300'
                      }`}
                    required
                  />
                  <ErrorMessage error={errors.email} touched={touched.email} />
                </div>

                <div>
                  <Input
                    type="tel"
                    placeholder="Phone Number (Optional)"
                    value={donorInfo.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    onBlur={(e) => handleInputBlur('phone', e.target.value)}
                    className={`focus:border-orange-500 ${errors.phone && touched.phone
                      ? 'border-red-300 focus:border-red-500'
                      : 'border-gray-300'
                      }`}
                    maxLength="10"
                  />
                  <ErrorMessage error={errors.phone} touched={touched.phone} />
                </div>

                <textarea
                  placeholder="Message (Optional)"
                  value={donorInfo.message}
                  onChange={(e) => setDonorInfo({ ...donorInfo, message: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg resize-none h-20 focus:border-orange-500 focus:outline-none"
                  maxLength="500"
                />
              </div>
              <Button
                onClick={handleNext}
                disabled={!donorInfo.name || !donorInfo.email || Object.keys(errors).length > 0}
                className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Proceed to Payment
              </Button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">Payment Method</h3>
                <button onClick={() => setStep(2)} className="text-sm text-orange-600 hover:text-orange-700">
                  ← Back
                </button>
              </div>
              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border border-green-200">
                <div className="text-center">
                  <p className="text-lg font-bold text-gray-800">₹{getCurrentAmount()}</p>
                  <p className="text-sm text-gray-600">for {campaign?.name || "the campaign"}</p>
                  <p className="text-xs text-gray-500 mt-1">Donor: {donorInfo.name}</p>
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700">Select Payment Method</label>
                <div className="space-y-2">
                  {[
                    { id: 'card', label: 'Credit/Debit Card', icon: CreditCard },
                    { id: 'upi', label: 'UPI Payment', icon: Smartphone },
                    { id: 'netbanking', label: 'Net Banking', icon: Building }
                  ].map((method) => {
                    const Icon = method.icon;
                    return (
                      <button
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id)}
                        className={`w-full p-3 rounded-lg border-2 text-left flex items-center gap-3 transition-all ${paymentMethod === method.id
                          ? 'border-orange-500 bg-orange-50'
                          : 'border-gray-200 hover:border-orange-300'
                          }`}
                      >
                        <Icon className="w-5 h-5 text-gray-600" />
                        <span className="font-medium">{method.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                <p className="text-xs text-yellow-800">
                  🔒 Your payment is secure and encrypted. You will receive a receipt via email.
                </p>
              </div>

              <Button
                onClick={handleContinue}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 rounded-lg font-semibold transition-all flex items-center justify-center"
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <Loader2 className="animate-spin h-5 w-5 mr-2" />
                    Processing...
                  </>
                ) : (
                  <>Complete Donation ₹{getCurrentAmount()}</>
                )}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};