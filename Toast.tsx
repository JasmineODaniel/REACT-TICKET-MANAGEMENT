import { useEffect } from 'react';
import { toast } from 'sonner';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'warning';
  onClose?: () => void;
}

export const showToast = ({ message, type }: Omit<ToastProps, 'onClose'>) => {
  switch (type) {
    case 'success':
      toast.success(message);
      break;
    case 'error':
      toast.error(message);
      break;
    case 'warning':
      toast.warning(message);
      break;
    default:
      toast(message);
  }
};

const Toast = ({ message, type, onClose }: ToastProps) => {
  useEffect(() => {
    showToast({ message, type });
    if (onClose) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, type, onClose]);

  return null;
};

export default Toast;