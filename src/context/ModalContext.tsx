'use client';

import React, { createContext, useContext, useState } from 'react';
import { Product } from '@/types';

interface ModalContextType {
  isRepairModalOpen: boolean;
  openRepairModal: (defaultServiceOrDevice?: string) => void;
  closeRepairModal: () => void;
  repairInitialDevice: string;

  isSellModalOpen: boolean;
  openSellModal: () => void;
  closeSellModal: () => void;

  quickViewProduct: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isRepairModalOpen, setIsRepairModalOpen] = useState(false);
  const [repairInitialDevice, setRepairInitialDevice] = useState('');
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const openRepairModal = (defaultServiceOrDevice: string = '') => {
    setRepairInitialDevice(defaultServiceOrDevice);
    setIsRepairModalOpen(true);
  };

  const closeRepairModal = () => {
    setIsRepairModalOpen(false);
    setRepairInitialDevice('');
  };

  const openSellModal = () => setIsSellModalOpen(true);
  const closeSellModal = () => setIsSellModalOpen(false);

  const openQuickView = (product: Product) => setQuickViewProduct(product);
  const closeQuickView = () => setQuickViewProduct(null);

  return (
    <ModalContext.Provider
      value={{
        isRepairModalOpen,
        openRepairModal,
        closeRepairModal,
        repairInitialDevice,
        isSellModalOpen,
        openSellModal,
        closeSellModal,
        quickViewProduct,
        openQuickView,
        closeQuickView,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModals() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModals must be used within a ModalProvider');
  }
  return context;
}

