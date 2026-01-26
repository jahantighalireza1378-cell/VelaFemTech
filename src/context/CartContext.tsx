'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// تعریف ظاهر محصول در سبد
type CartItem = {
  id: number | string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number | string) => void;
  clearCart: () => void;
  total: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // 1. بارگذاری سبد خرید از حافظه مرورگر (فقط یکبار در شروع)
  useEffect(() => {
    const savedCart = localStorage.getItem('vela_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Error parsing cart:', e);
      }
    }
    setIsInitialized(true);
  }, []);

  // 2. ذخیره تغییرات در حافظه مرورگر
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('vela_cart', JSON.stringify(cart));
    }
  }, [cart, isInitialized]);

  // افزودن محصول
  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        // اگر هست، تعدادش را زیاد کن
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      // اگر نیست، اضافه‌اش کن
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  // حذف محصول
  const removeFromCart = (id: number | string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // خالی کردن سبد
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('vela_cart');
  };

  // محاسبه قیمت کل
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
}

// هوک مخصوص برای استفاده آسان
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}