
import React from 'react';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Trash2, Plus, ShoppingCart, ArrowLeft, Home } from 'lucide-react';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getTotalItems, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    navigate('/donate', { state: { cartItems } });
  };

  // Breadcrumb component
  const Breadcrumb = () => (  
    <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
      <Button 
        variant="ghost" 
        size="sm"
        onClick={() => navigate('/donate-items')}
        className="p-0 h-auto text-orange-600 hover:text-orange-700"
      >
        <Home className="w-4 h-4 mr-1" />
        Home
      </Button>
      <span>›</span>
      <Button 
        variant="ghost" 
        size="sm"
        onClick={() => navigate('/donate-items/?scrollTo=kits')}
        className="p-0 h-auto text-orange-600 hover:text-orange-700"
      >
        Kits
      </Button>
      <span>›</span>
      <span className="text-gray-800 font-medium">Cart</span>
    </div>
  );

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-6 max-w-4xl">
          <Breadcrumb />
          <div className="text-center py-16">
            <ShoppingCart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">Add some kits to your cart to make a difference!</p>
            <Button 
              onClick={() => navigate('/donate-items/?scrollTo=kits')}
              className="bg-orange-600 hover:bg-orange-700"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Browse Kits
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="mb-8">
          <Breadcrumb />
          <Button 
            variant="ghost" 
            onClick={() => navigate('/donate-items/?scrollTo=kits')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continue Shopping
          </Button>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Your Donation Cart</h1>
          <p className="text-gray-600">
            {getTotalItems()} {getTotalItems() === 1 ? 'kit' : 'kits'} selected for donation
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id} className="p-6">
                <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full md:w-32 h-32 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-600 mb-3">{item.description}</p>
                    <p className="text-orange-600 font-semibold">₹{item.price.toLocaleString()} each</p>
                  </div>
                  
                  <div className="flex flex-col items-end space-y-4">
                    <div className="flex items-center space-x-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        -
                      </Button>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                        className="w-16 text-center"
                        min="1"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Remove
                    </Button>
                    
                    <p className="font-semibold text-lg">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Donation Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>{item.title} × {item.quantity}</span>
                      <span>₹{(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>₹{getTotalPrice().toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="text-sm text-gray-600">
                  <p>✅ 80G Tax Exemption Available</p>
                  <p>🔒 Secure Payment Gateway</p>
                  <p>📧 Instant Receipt & Updates</p>
                </div>
                
                <div className="space-y-3">
                  <Button 
                    onClick={handleCheckout}
                    className="w-full bg-orange-600 hover:bg-orange-700 py-3"
                  >
                    Proceed to Donation
                  </Button>
                  
                  <Button 
                    onClick={clearCart}
                    variant="outline"
                    className="w-full"
                  >
                    Clear Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
