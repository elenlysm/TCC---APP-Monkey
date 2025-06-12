import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors, fonts, fontSizes } from '../..//app/theme';

type ButtonProps = {
    title: string;
    variant?: 'primary' | 'subtle';
    onPress?: () => void;
};

export default function Button({ title, variant = 'primary', onPress }: ButtonProps) {
    return (
        <TouchableOpacity
            style={[styles.button, variant === 'subtle' ? styles.subtle : styles.primary]}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <Text style={[styles.text, variant === 'subtle' ? styles.textSubtle : styles.textPrimary]}>
                {title}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    primary: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
    },
    subtle: {
        backgroundColor: colors.background,
        borderColor: colors.buttonBorder,
    },
    text: {
        fontFamily: fonts.main,
        fontSize: fontSizes.button,
        fontWeight: '400',
    },
    textPrimary: {
        color: colors.buttonText,
    },
    textSubtle: {
        color: colors.textPrimary,
    },
});
