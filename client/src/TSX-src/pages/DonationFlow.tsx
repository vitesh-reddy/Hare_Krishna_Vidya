import React, { useState } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { ArrowLeft, CreditCard, User, Mail, Phone, Package, Home, ShoppingCart } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { initiateRazorpayPayment } from '../../PaymentService.jsx';
import { toast } from 'react-hot-toast';

const DonationFlow = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems, clearCart } = useCart();
  const { getKitById, getGroceryItemById } = useData();
  const [isProcessing, setIsProcessing] = useState(false);
  const kitId = searchParams.get('kit');
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(() => {
    const storedData = JSON.parse(localStorage.getItem('donorData')) || {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      // Removed panCard as it's not used in the UI or backend
    };
    return storedData;
  });
  const [paymentError, setPaymentError] = useState(null);

  const isCartMode = location.state?.cartItems && location.state.cartItems.length > 0;
  const selectedCartItems = location.state?.cartItems || [];
  const selectedKit = getKitById(kitId);
  const selectedGroceryItem = getGroceryItemById(kitId);

  const totalAmount = isCartMode
    ? selectedCartItems.reduce((total, item) => total + item.price * item.quantity, 0)
    : selectedKit?.price || selectedGroceryItem?.price || 0;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedFormData = {
        ...prev,
        [name]: value,
      };
      // Update localStorage with the latest state
      localStorage.setItem('donorData', JSON.stringify(updatedFormData));
      return updatedFormData;
    });
  };

  const handleContinue = async () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      try {
        setIsProcessing(true);
        toast.loading('Payment Processing');
        const baseUrl = import.meta.env.VITE_BACKEND_URL;
        const response = await fetch(`${baseUrl}/api/payments/create-order`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: totalAmount * 100, // Convert to paise
            currency: 'INR',
            donationType: 'items',
          }),
        });

        const orderData = await response.json();
        if (!response.ok) {
          throw new Error(orderData.error || 'Failed to create payment order');
        }

        initiateRazorpayPayment(
          {
            orderId: orderData.orderId,
            amount: totalAmount * 100,
            donorName: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            phone: formData.phone,
          },
          async (paymentResponse) => {
            const items = isCartMode
              ? selectedCartItems.map((item) => { console.log(item.type); return ({
                  itemId: item.id,
                  itemType: item.type,
                  itemName: item.name,
                  quantity: item.quantity,
                  price: item.price,
                })})
              : [
                  {
                    itemId: kitId,
                    itemType: selectedKit ? 'Kit' : 'GroceryItem',
                    itemName: selectedKit ? selectedKit.name : selectedGroceryItem.name,
                    quantity: 1,
                    price: selectedKit ? selectedKit.price : selectedGroceryItem.price,
                  },
                ];

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
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    phone: formData.phone,
                    address: formData.address,
                    city: formData.city,
                    state: formData.state,
                    pincode: formData.pincode,
                  },
                  donationType: 'items',
                  donatedFor: null,
                  items: items,
                  amount: totalAmount,
                  paymentDetails: {
                    orderId: orderData.orderId,
                    paymentId: paymentResponse.razorpay_payment_id,
                    signature: paymentResponse.razorpay_signature,
                  },
                },
              }),
            });

            const verifyResult = await verifyResponse.json();
            if (!verifyResponse.ok) {
              throw new Error(verifyResult.error || 'Payment verification failed');
            }

            if (isCartMode) {
              clearCart();
            }
            toast.dismiss();
            navigate('/donation-success', {
              state: {
                cartItems: isCartMode ? selectedCartItems : undefined,
                kit: !isCartMode ? (selectedKit || selectedGroceryItem) : undefined,
                amount: totalAmount,
                donorName: `${formData.firstName} ${formData.lastName}`,
                paymentId: paymentResponse.razorpay_payment_id,
              },
            });
          },
          (error) => {
            toast.dismiss();
            setIsProcessing(false);
            setPaymentError(error);
            toast.error(error || 'Payment failed. Please try again.');
          }
        );
      } catch (error) {
        toast.dismiss();
        setIsProcessing(false);
        setPaymentError(error.message);
        toast.error(error.message || 'An error occurred during payment.');
      }
    }
  };

  const handleBackNavigation = () => {
    if (step === 1) {
      if (isCartMode) {
        navigate('/cart');
      } else {
        navigate('../donate-items/?scrollTo=kits');
      }
    } else {
      setStep(step - 1);
    }
  };

  const Breadcrumb = () => (
    <div className="flex items-center space-x-[0.5rem] text-[0.875rem] text-[#4B5563] mb-[1.5rem] dark:text-[#9CA3AF]">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate('/')}
        className="p-0 h-auto text-[#F97316] hover:text-[#EA580C]"
      >
        <Home className="w-[1rem] h-[1rem] mr-[0.25rem]" />
        Home
      </Button>
      <span>›</span>
      {isCartMode ? (
        <>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/cart')}
            className="p-0 h-auto text-[#F97316] hover:text-[#EA580C]"
          >
            <ShoppingCart className="w-[1rem] h-[1rem] mr-[0.25rem]" />
            Cart
          </Button>
          <span>›</span>
        </>
      ) : (
        <>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/donate-items/?scrollTo=kits')}
            className="p-0 h-auto text-[#F97316] hover:text-[#EA580C]"
          >
            Kits
          </Button>
          <span>›</span>
        </>
      )}
      <span className="text-[#1F2937] font-medium dark:text-[#F5F7FD]">
        Donation Flow - Step {step}
      </span>
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-[1.5rem]">
      <h2 className="text-[1.5rem] font-bold text-center">
        {isCartMode ? 'Your Selected Items' : 'Kit Details & Donation Amount'}
      </h2>
      {isCartMode ? (
        <div className="space-y-[1rem]">
          {selectedCartItems.map((item) => (
            <Card key={item.id} className="p-[1.5rem]">
              <div className="flex flex-col md:flex-row items-start space-y-[1rem] md:space-y-0 md:space-x-[1.5rem]">
                <img  loading="lazy" src={item.image} alt={item.name} className="w-full md:w-[6rem] h-[6rem] object-cover rounded-[0.5rem]" />
                <div className="flex-1">
                  <h3 className="text-[1.125rem] font-semibold">{item.name}</h3>
                  <p className="text-[#4B5563] text-[0.875rem] dark:text-[#9CA3AF]">{item.description}</p>
                  <div className="flex justify-between items-center mt-[0.5rem]">
                    <span className="text-[#F97316] font-semibold">
                      ₹{item.price.toLocaleString()} × {item.quantity}
                    </span>
                    <span className="font-bold">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
          <Card className="p-[1.5rem] bg-[#FFF7ED] border-[#FED7AA] dark:bg-[#7C2D12] dark:border-[#EA580C]">
            <div className="flex justify-between items-center text-[1.25rem] font-bold">
              <span>Total Donation Amount</span>
              <span className="text-[#F97316]">₹{totalAmount.toLocaleString()}</span>
            </div>
          </Card>
        </div>
      ) : selectedKit ? (
        <div className="space-y-[1.5rem]">
          <Card className="mb-[1.5rem]">
            <CardContent className="p-[1.5rem]">
              <div className="flex flex-col md:flex-row items-start space-y-[1rem] md:space-y-0 md:space-x-[1.5rem]">
                <img  loading="lazy" src={selectedKit.image} alt={selectedKit.name} className="w-full md:w-[8rem] h-[8rem] object-cover rounded-[0.5rem]" />
                <div className="flex-1">
                  <h3 className="text-[1.5rem] font-semibold mb-[0.5rem]">{selectedKit.name}</h3>
                  <p className="text-[#4B5563] mb-[0.75rem] dark:text-[#9CA3AF]">{selectedKit.description}</p>
                  <div className="flex items-center text-[#F97316] font-semibold">
                    <Package className="w-[1.25rem] h-[1.25rem] mr-[0.5rem]" />
                    Suggested: ₹{selectedKit.price.toLocaleString()}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#FED7AA] bg-[#FFF7ED] dark:border-[#EA580C] dark:bg-[#7C2D12]">
            <CardHeader className="pb-[1rem]">
              <CardTitle className="text-[1.25rem] text-[#9A3412] flex items-center dark:text-[#FDBA74]">
                <Package className="w-[1.5rem] h-[1.5rem] mr-[0.5rem]" />
                What's Included in This Kit
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid md:grid-cols-2 gap-[0.75rem]">
                {selectedKit.items.map((item, index) => (
                  <div key={index} className="flex items-center bg-[#FFFFFF] p-[0.75rem] rounded-[0.5rem] border border-[#FED7AA] dark:bg-[#0F172A] dark:border-[#EA580C]">
                    <div className="w-[0.75rem] h-[0.75rem] bg-[#F97316] rounded-full mr-[0.75rem] flex-shrink-0"></div>
                    <span className="text-[#374151] font-medium dark:text-[#F5F7FD]">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-[1rem] p-[1rem] bg-[#FFFFFF] rounded-[0.5rem] border border-[#FED7AA] dark:bg-[#0F172A] dark:border-[#EA580C]">
                <p className="text-[0.875rem] text-[#4B5563] italic dark:text-[#9CA3AF]">
                  💝 Each kit is carefully assembled with quality items and delivered directly to beneficiaries in underserved communities.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        selectedGroceryItem && (
          <div className="space-y-[1.5rem]">
            <Card className="mb-[1.5rem]">
              <CardContent className="p-[1.5rem]">
                <div className="flex flex-col md:flex-row items-start space-y-[1rem] md:space-y-0 md:space-x-[1.5rem]">
                  <img  loading="lazy" src={selectedGroceryItem.image} alt={selectedGroceryItem.name} className="w-full md:w-[8rem] h-[8rem] object-cover rounded-[0.5rem]" />
                  <div className="flex-1">
                    <h3 className="text-[1.5rem] font-semibold mb-[0.5rem]">{selectedGroceryItem.name}</h3>
                    <p className="text-[#4B5563] mb-[0.75rem] dark:text-[#9CA3AF]">{selectedGroceryItem.description}</p>
                    <p className="text-[#4B5563] mb-[0.75rem] dark:text-[#9CA3AF]">Serves: {selectedGroceryItem.serves}</p>
                    <div className="flex items-center text-[#F97316] font-semibold">
                      <Package className="w-[1.25rem] h-[1.25rem] mr-[0.5rem]" />
                      Suggested: ₹{selectedGroceryItem.price.toLocaleString()}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      )}
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-[1.5rem]">
      <h2 className="text-[1.5rem] font-bold text-center">Your Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[1rem]">
        <div>
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
      <div>
        <Label htmlFor="email">Email Address *</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="phone">Phone Number *</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[1rem]">
        <div>
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Label htmlFor="state">State</Label>
          <Input
            id="state"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Label htmlFor="pincode">Pincode</Label>
          <Input
            id="pincode"
            name="pincode"
            value={formData.pincode}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-[1.5rem]">
      <h2 className="text-[1.5rem] font-bold text-center">Payment Details</h2>
      <Card className="p-[1.5rem] bg-[#F9FAFB] dark:bg-[#1F2937]">
        <h3 className="font-semibold mb-[1rem]">Donation Summary</h3>
        <div className="space-y-[0.5rem]">
          {isCartMode ? (
            selectedCartItems.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span className="font-medium">
                  {item.name} × {item.quantity}:
                </span>
                <span>₹{(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))
          ) : selectedKit ? (
            <p>
              <span className="font-medium">Kit:</span> {selectedKit.name}
            </p>
          ) : (
            selectedGroceryItem && (
              <p>
                <span className="font-medium">Grocery Item:</span> {selectedGroceryItem.name}
              </p>
            )
          )}
          <div className="border-t pt-[0.5rem] mt-[0.5rem]">
            <div className="flex justify-between font-bold text-[1.125rem]">
              <span>Total Amount:</span>
              <span>₹{totalAmount.toLocaleString()}</span>
            </div>
          </div>
          <p>
            <span className="font-medium">Donor:</span> {formData.firstName} {formData.lastName}
          </p>
          <p>
            <span className="font-medium">Email:</span> {formData.email}
          </p>
        </div>
      </Card>
      <div className="space-y-[1rem]">
        <div className="flex items-center space-x-[0.5rem]">
          <CreditCard className="w-[1.25rem] h-[1.25rem]" />
          <Label>Payment Method: Credit/Debit Card</Label>
        </div>
        <div className="bg-[#EFF6FF] p-[1rem] rounded-[0.5rem] dark:bg-[#1E3A8A]">
          <p className="text-[0.875rem] text-[#1E40AF] dark:text-[#BFDBFE]">
            🔒 Your payment is secured with 256-bit SSL encryption.
            You'll be redirected to our secure payment gateway.
          </p>
        </div>
        <div className="text-center">
          <p className="text-[0.875rem] text-[#4B5563] mb-[1rem] dark:text-[#9CA3AF]">
            By proceeding, you agree to our Terms of Service and Privacy Policy.
            Your donation is eligible for 80G tax exemption.
          </p>
        </div>
      </div>
      {paymentError && (
        <div className="text-red-600 text-center">
          {paymentError}
        </div>
      )}
    </div>
  );

  if (!isCartMode && !selectedKit && !selectedGroceryItem) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center dark:bg-[#1F2937]">
        <Card className="p-[2rem] text-center">
          <h2 className="text-[1.5rem] font-bold mb-[1rem]">Invalid Selection</h2>
          <p className="text-[#4B5563] mb-[1.5rem] dark:text-[#9CA3AF]">
            Please select a valid kit or add items to cart to proceed with donation.
          </p>
          <Button onClick={() => navigate('/donate-items')}>
            <ArrowLeft className="w-[1rem] h-[1rem] mr-[0.5rem]" />
            Back to Home
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] py-[2rem] dark:bg-[#1F2937]">
      <div className="container mx-auto px-[1.5rem] max-w-[48rem]">
        <div className="mb-[2rem]">
          <Breadcrumb />
          <Button
            variant="ghost"
            onClick={handleBackNavigation}
            className="mb-[1rem]"
          >
            <ArrowLeft className="w-[1rem] h-[1rem] mr-[0.5rem]" />
            {step === 1 ? (isCartMode ? 'Back to Cart' : 'Back to Kits') : 'Previous Step'}
          </Button>
          <div className="flex items-center justify-center space-x-[1rem] mb-[2rem]">
            {[1, 2, 3].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div
                  className={`w-[2rem] h-[2rem] rounded-full flex items-center justify-center text-[0.875rem] font-semibold ${
                    stepNum <= step ? 'bg-[#F97316] text-[#FFFFFF]' : 'bg-[#E5E7EB] text-[#4B5563]'
                  }`}
                >
                  {stepNum}
                </div>
                {stepNum < 3 && (
                  <div
                    className={`w-[3rem] h-[0.125rem] ${
                      stepNum < step ? 'bg-[#F97316]' : 'bg-[#E5E7EB]'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
        <Card className="p-[2rem]">
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
          <div className="mt-[2rem] flex justify-center">
            <Button
              onClick={handleContinue}
              className="bg-[#F97316] hover:bg-[#EA580C] px-[2rem] py-[0.75rem] text-[1.125rem]"
              disabled={
                isProcessing || step === 2 && (!formData.firstName || !formData.lastName || !formData.email || !formData.phone)
              }
            >
              {step === 3 ? (isProcessing ? 'Payment Processing' : 'Complete Donation') : 'Continue'}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DonationFlow;