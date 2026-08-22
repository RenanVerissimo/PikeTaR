import React from 'react';
import { Text, View } from 'react-native';

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
    if (!visible) {
        return null;
    }

    return (
        <View
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
        </View>
    );
}
