type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastOptions {
  duration?: number;
  position?: 'top' | 'bottom' | 'top-center' | 'bottom-center';
}

// Simple toast notification system using browser's native capabilities
export const showToast = (message: string, type: ToastType = 'info', options?: ToastOptions) => {
  const duration = options?.duration ?? 3000;
  
  // For now, using console + alert fallback for demo
  // In production, would use a proper toast library like react-toastify or sonner
  const emoji = {
    success: '✅',
    error: '❌',
    info: 'ℹ️',
    warning: '⚠️'
  };

  console.log(`[${type.toUpperCase()}] ${emoji[type]} ${message}`);
  
  // Optional: Show visual feedback (commented out to avoid disrupting UX)
  // You can uncomment this or integrate with a toast library
  // if (type === 'error') {
  //   console.error(message);
  // }
};

export const toastSuccess = (message: string, options?: ToastOptions) => 
  showToast(message, 'success', options);

export const toastError = (message: string, options?: ToastOptions) => 
  showToast(message, 'error', options);

export const toastInfo = (message: string, options?: ToastOptions) => 
  showToast(message, 'info', options);

export const toastWarning = (message: string, options?: ToastOptions) => 
  showToast(message, 'warning', options);
