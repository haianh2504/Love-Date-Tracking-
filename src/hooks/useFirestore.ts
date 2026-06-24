import { useState, useRef, useEffect, useCallback } from 'react';
import { getDoc, setDoc } from 'firebase/firestore';
import { getProfileDocRef } from '../firebase';
import type { CoupleProfile } from '../types';

type GetProfileResult = {
  success: boolean;
  data?: CoupleProfile | null;
  error?: string | null;
};

type SaveProfileResult = {
  success: boolean;
  error?: string | null;
};

// Vẫn giữ lại Regex để chặn request rác ngay từ client
const ALLOWED_DOC_ID = /^[a-zA-Z0-9_-]{1,128}$/; 

export const useFirestore = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const safeSetLoading = (v: boolean) => { if (mountedRef.current) setLoading(v); };
  const safeSetError = (v: string | null) => { if (mountedRef.current) setError(v); };

  // Dùng useCallback để tránh re-render không cần thiết nếu hook này được gọi trong useEffect ở component khác
  const getProfile = useCallback(async (documentId: string): Promise<GetProfileResult> => {
    safeSetLoading(true);
    safeSetError(null);

    if (!ALLOWED_DOC_ID.test(documentId)) {
      const msg = 'Invalid documentId format';
      safeSetError(msg);
      safeSetLoading(false);
      return { success: false, data: null, error: msg };
    }

    try {
      const docRef = getProfileDocRef(documentId);
      const docSnap = await getDoc(docRef); // Converter tự động parse dữ liệu ở đây

      if (!docSnap.exists()) {
        return { success: true, data: null };
      }

      // Không cần "as CoupleProfile" hay check typeof object nữa. 
      // TypeScript hiểu docSnap.data() chắc chắn là CoupleProfile nhờ Converter.
      return { success: true, data: docSnap.data() }; 

    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unknown error fetching profile';
      console.error('useFirestore.getProfile error:', err);
      safeSetError(msg);
      return { success: false, data: null, error: msg };
    } finally {
      safeSetLoading(false);
    }
  }, []);

  const saveProfile = useCallback(async (documentId: string, data: Partial<CoupleProfile>): Promise<SaveProfileResult> => {
    safeSetLoading(true);
    safeSetError(null);

    if (!ALLOWED_DOC_ID.test(documentId)) {
      const msg = 'Invalid documentId format';
      safeSetError(msg);
      safeSetLoading(false);
      return { success: false, error: msg };
    }

    try {
      // Chặn network request nếu payload rỗng
      if (!data || Object.keys(data).length === 0) {
        const msg = 'No valid profile fields provided';
        safeSetError(msg);
        return { success: false, error: msg };
      }

      const docRef = getProfileDocRef(documentId);
      
      // Truyền thẳng 'data' vào setDoc. 
      // profileConverter.toFirestore sẽ tự động chạy ngầm, lọc rác và loại bỏ undefined.
      await setDoc(docRef, data, { merge: true });
      
      return { success: true };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unknown error saving profile';
      console.error('useFirestore.saveProfile error:', err);
      safeSetError(msg);
      return { success: false, error: msg };
    } finally {
      safeSetLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    getProfile,
    saveProfile,
  };
};