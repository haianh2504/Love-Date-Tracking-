// ==========================================
// 1. IMPORTS
// ==========================================
// Thay dòng import cũ thành dòng này:
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  DocumentReference,
  Timestamp, 
  QueryDocumentSnapshot, 
  SnapshotOptions, 
  DocumentData, 
  WithFieldValue, 
  FirestoreDataConverter 
} from 'firebase/firestore';
import type { CoupleProfile } from './types';

// ==========================================
// 2A. FIREBASE CONFIGURATION & INIT
// ==========================================
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Khởi tạo App và Database
export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);

// ==========================================
// 2B. FIREBASE AUTHENTICATION
// ==========================================
export const getFirebaseAuth = () => getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// ==========================================
// 3. HELPERS
// ==========================================
// Type guard: Kiểm tra đối tượng Timestamp của Firestore an toàn
const isTimestamp = (val: unknown): val is Timestamp => {
  return typeof val === 'object' && val !== null && 'toDate' in val;
};

// ==========================================
// 4. DATA ACCESS LAYER (CONVERTER)
// ==========================================
export const profileConverter: FirestoreDataConverter<CoupleProfile> = {
  // --- WRITE ---
  toFirestore(profile: WithFieldValue<CoupleProfile>): DocumentData {
    const rawPayload: Partial<CoupleProfile> = {
      partner1: profile.partner1 as string | undefined,
      partner2: profile.partner2 as string | undefined,
      weddingDate: profile.weddingDate as string | undefined,
      anniversaryTitle: profile.anniversaryTitle as string | undefined,
      anniversarySubtitle: profile.anniversarySubtitle as string | undefined,
      quote: profile.quote as string | undefined,
      letterText: profile.letterText as string | undefined,
    };

    const cleanDocument: DocumentData = {};
    Object.entries(rawPayload).forEach(([key, value]) => {
      if (value !== undefined) {
        cleanDocument[key] = value;
      }
    });

    return cleanDocument;
  },

  // --- READ ---
  fromFirestore(
    snapshot: QueryDocumentSnapshot<DocumentData>,
    options: SnapshotOptions
  ): CoupleProfile {
    const data = snapshot.data(options);

    const parseString = (val: unknown, fallback = ''): string => {
      return typeof val === 'string' ? val : fallback;
    };

    const parseDateString = (val: unknown): string => {
      if (typeof val === 'string') return val;
      if (val instanceof Date) return val.toISOString().slice(0, 10);
      if (isTimestamp(val)) return val.toDate().toISOString().slice(0, 10);
      return '';
    };

    return {
      partner1: parseString(data.partner1),
      partner2: parseString(data.partner2),
      weddingDate: parseDateString(data.weddingDate),
      anniversaryTitle: parseString(data.anniversaryTitle),
      anniversarySubtitle: parseString(data.anniversarySubtitle),
      quote: parseString(data.quote),
      letterText: parseString(data.letterText),
    };
  }
};

// ==========================================
// 5. DOCUMENT REFERENCE FACTORY
// ==========================================
const ALLOWED_DOC_ID = /^[a-zA-Z0-9_-]{1,128}$/;

export const getProfileDocRef = (documentId: string): DocumentReference<CoupleProfile> => {
  if (!ALLOWED_DOC_ID.test(documentId)) {
    throw new Error('Invalid documentId format');
  }
  
  // Sử dụng trực tiếp biến 'db' đã được export ở phần 2. 
  // Tránh khai báo lại biến cục bộ gây lỗi.
  return doc(db, 'profiles', documentId).withConverter(profileConverter);
};