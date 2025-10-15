'use client';

import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  addDoc,
} from 'firebase/firestore';
import { db } from '@/config/firebase';

// Collections
export const COLLECTIONS = {
  USERS: 'users',
  PRODUCTS: 'products',
  ORDERS: 'orders',
  CREATORS: 'creators',
  STORES: 'stores',
};

// User Operations
export const createUserProfile = async (userId: string, data: any) => {
  try {
    await setDoc(doc(db, COLLECTIONS.USERS, userId), {
      ...data,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
};

export const getUserProfile = async (userId: string) => {
  try {
    const docRef = doc(db, COLLECTIONS.USERS, userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { data: { id: docSnap.id, ...docSnap.data() }, error: null };
    }
    return { data: null, error: 'User not found' };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
};

export const updateUserProfile = async (userId: string, data: any) => {
  try {
    const docRef = doc(db, COLLECTIONS.USERS, userId);
    await updateDoc(docRef, {
      ...data,
      updatedAt: Timestamp.now(),
    });
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
};

// Product Operations
export const createProduct = async (data: any) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTIONS.PRODUCTS), {
      ...data,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    return { id: docRef.id, error: null };
  } catch (error: any) {
    return { id: null, error: error.message };
  }
};

export const getProduct = async (productId: string) => {
  try {
    const docRef = doc(db, COLLECTIONS.PRODUCTS, productId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { data: { id: docSnap.id, ...docSnap.data() }, error: null };
    }
    return { data: null, error: 'Product not found' };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
};

export const getAllProducts = async (limitCount = 50) => {
  try {
    const q = query(
      collection(db, COLLECTIONS.PRODUCTS),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );
    const querySnapshot = await getDocs(q);

    const products = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return { data: products, error: null };
  } catch (error: any) {
    return { data: [], error: error.message };
  }
};

export const getProductsByCreator = async (creatorId: string) => {
  try {
    const q = query(
      collection(db, COLLECTIONS.PRODUCTS),
      where('creatorId', '==', creatorId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);

    const products = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return { data: products, error: null };
  } catch (error: any) {
    return { data: [], error: error.message };
  }
};

export const updateProduct = async (productId: string, data: any) => {
  try {
    const docRef = doc(db, COLLECTIONS.PRODUCTS, productId);
    await updateDoc(docRef, {
      ...data,
      updatedAt: Timestamp.now(),
    });
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
};

export const deleteProduct = async (productId: string) => {
  try {
    await deleteDoc(doc(db, COLLECTIONS.PRODUCTS, productId));
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
};

// Order Operations
export const createOrder = async (data: any) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTIONS.ORDERS), {
      ...data,
      status: 'pending',
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    return { id: docRef.id, error: null };
  } catch (error: any) {
    return { id: null, error: error.message };
  }
};

export const getOrdersByUser = async (userId: string) => {
  try {
    const q = query(
      collection(db, COLLECTIONS.ORDERS),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);

    const orders = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return { data: orders, error: null };
  } catch (error: any) {
    return { data: [], error: error.message };
  }
};

// Creator Operations
export const createCreatorProfile = async (userId: string, data: any) => {
  try {
    await setDoc(doc(db, COLLECTIONS.CREATORS, userId), {
      ...data,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
};

export const getCreatorProfile = async (creatorId: string) => {
  try {
    const docRef = doc(db, COLLECTIONS.CREATORS, creatorId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { data: { id: docSnap.id, ...docSnap.data() }, error: null };
    }
    return { data: null, error: 'Creator not found' };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
};

export const getAllCreators = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTIONS.CREATORS));
    const creators = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return { data: creators, error: null };
  } catch (error: any) {
    return { data: [], error: error.message };
  }
};
