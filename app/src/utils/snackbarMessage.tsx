import React, { useEffect, useRef } from 'react';
import { Animated, Text } from 'react-native';

type SnackbarMessageProps = {
  visible: boolean;
  message: string;
  backgroundColor?: string;
  top?: number;
  height?: number;
  left?: number;
  right?: number;
};

export default function SnackbarMessage({
  visible,
  message,
  backgroundColor = '#006e0f',
  top = 32,
  height = 48,
  left = 16,
  right = 16,
}: SnackbarMessageProps) {
  const translateX = useRef(new Animated.Value(400)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: 0,
          duration: 280,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 220,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: 400,
          duration: 220,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 180,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, translateX, opacity]);

  if (!visible) {
    return null;
  }

  return (
    <Animated.View
      style={{
        position: 'absolute',
        left,
        right,
        top,
        minHeight: height,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        backgroundColor,
        alignItems: 'center',
        justifyContent: 'center',
        opacity,
        transform: [{ translateX }],
      }}
    >
      <Text
        style={{
          color: '#fff',
          fontSize: 14,
          fontWeight: '600',
          textAlign: 'center',
        }}
      >
        {message}
      </Text>
    </Animated.View>
  );
}