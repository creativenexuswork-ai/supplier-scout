import { useState, useEffect, useCallback } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback((value: T | ((prev: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue];
}

// Types for saved items
export interface SavedProduct {
  productId: string;
  title: string;
  brand: string;
  itemType: string;
  imageUrl: string;
  supplierId: string;
  supplierScore: number;
  category: string;
  savedAt: string;
  note?: string;
  price?: number;
  currency?: string;
}

export interface SavedSupplier {
  supplierId: string;
  savedAt: string;
}

export function useSavedProducts() {
  return useLocalStorage<SavedProduct[]>('supplierintel_saved_products', []);
}

export function useSavedSuppliers() {
  return useLocalStorage<SavedSupplier[]>('supplierintel_saved_suppliers', []);
}

export function useSearchHistory() {
  return useLocalStorage<string[]>('supplierintel_search_history', []);
}
