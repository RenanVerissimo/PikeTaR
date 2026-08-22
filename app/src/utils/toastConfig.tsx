import React from 'react';
import { BaseToast, ErrorToast } from 'react-native-toast-message';

export const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      text1NumberOfLines={2}
      text2NumberOfLines={4}
      style={{ borderLeftColor: '#22c55e', minHeight: 74, width: '92%' }}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      text1NumberOfLines={2}
      text2NumberOfLines={4}
      style={{ borderLeftColor: '#ef4444', minHeight: 74, width: '92%' }}
    />
  ),
  info: (props: any) => (
    <BaseToast
      {...props}
      text1NumberOfLines={2}
      text2NumberOfLines={4}
      style={{ borderLeftColor: '#3b82f6', minHeight: 74, width: '92%' }}
    />
  ),
};
