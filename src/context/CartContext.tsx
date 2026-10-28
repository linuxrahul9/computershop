'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product } from '@/types';
import { siteConfig } from '@/config/site';
import { useToast } from './ToastContext';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  totalItems: number;
  subtotal: number;
  shippingEstimate: number;
  grandTotal: number;
  getWhatsAppOrderUrl: (customerNotes?: string) => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { showToast } = useToast();

  // Load from local storage once mounted
  useEffect(() => {
    try {
      const stored = localStorage.getItem('app-cart');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setCart(parsed);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  // Save changes to local storage
  const saveCart = (nextCart: CartItem[]) => {
    setCart(nextCart);
    try {
      localStorage.setItem('app-cart', JSON.stringify(nextCart));
    } catch {
      // ignore
    }
  };

  const addToCart = (product: Product, quantity: number = 1) => {
    const existingIndex = cart.findIndex((item) => item.product.id === product.id);
    let nextCart: CartItem[];
    if (existingIndex > -1) {
      nextCart = cart.map((item, idx) =>
        idx === existingIndex ? { ...item, quantity: item.quantity + quantity } : item
      );
    } else {
      nextCart = [...cart, { product, quantity }];
    }
    saveCart(nextCart);
    showToast(`Added "${product.name}" to cart!`, 'success');
  };

  const removeFromCart = (productId: string) => {
    const item = cart.find((i) => i.product.id === productId);
    if (item) {
      showToast(`Removed "${item.product.name}" from cart`, 'info');
    }
    const nextCart = cart.filter((i) => i.product.id !== productId);
    saveCart(nextCart);
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    const nextCart = cart.map((item) =>
      item.product.id === productId ? { ...item, quantity } : item
    );
    saveCart(nextCart);
  };

  const clearCart = () => {
    saveCart([]);
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shippingEstimate = subtotal > 999 || subtotal === 0 ? 0 : 99;
  const grandTotal = subtotal + shippingEstimate;

  const getWhatsAppOrderUrl = (customerNotes?: string) => {
    if (cart.length === 0) return `https://wa.me/${siteConfig.whatsappNumber}`;

    let msg = `*NEW ORDER INQUIRY - ${siteConfig.name}*\n`;
    msg += `------------------------------------\n`;
    cart.forEach((item, idx) => {
      msg += `${idx + 1}. *${item.product.name}*\n`;
      msg += `   • Condition: ${item.product.condition}\n`;
      msg += `   • Qty: ${item.quantity} × ${siteConfig.currencySymbol}${item.product.price.toLocaleString('en-IN')}\n`;
      msg += `   • Subtotal: ${siteConfig.currencySymbol}${(item.product.price * item.quantity).toLocaleString('en-IN')}\n\n`;
    });
    msg += `------------------------------------\n`;
    msg += `*Items Subtotal:* ${siteConfig.currencySymbol}${subtotal.toLocaleString('en-IN')}\n`;
    msg += `*Estimated Shipping:* ${shippingEstimate === 0 ? 'FREE' : `${siteConfig.currencySymbol}${shippingEstimate}`}\n`;
    msg += `*Total Order Value:* ${siteConfig.currencySymbol}${grandTotal.toLocaleString('en-IN')}\n`;

    if (customerNotes) {
      msg += `\n*Customer Note:* ${customerNotes}\n`;
    }
    msg += `\nPlease confirm availability and payment/pickup options. Thank you!`;

    const encoded = encodeURIComponent(msg);
    return `https://wa.me/${siteConfig.whatsappNumber}?text=${encoded}`;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        totalItems,
        subtotal,
        shippingEstimate,
        grandTotal,
        getWhatsAppOrderUrl,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
