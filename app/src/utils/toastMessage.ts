import Toast from 'react-native-toast-message';

type ToastMessageType = 'success' | 'error' | 'info';

type ExibirToastParams = {
  type?: ToastMessageType;
  title: string;
  message?: string;
  visibilityTime?: number;
};

export function exibirToast({
  type = 'success',
  title,
  message,
  visibilityTime = 3000,
}: ExibirToastParams) {
  Toast.show({
    type,
    text1: title,
    text2: message,
    position: 'top',
    visibilityTime,
  });
}

export function exibirToastSucesso(title: string, message?: string) {
  exibirToast({
    type: 'success',
    title,
    message,
  });
}

export function exibirToastErro(title: string, message?: string) {
  exibirToast({
    type: 'error',
    title,
    message,
  });
}

export function exibirToastInfo(title: string, message?: string) {
  exibirToast({
    type: 'info',
    title,
    message,
  });
}
