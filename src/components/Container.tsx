import React, { ReactNode } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { colors } from '../../app/theme';

type ContainerProps = {
    children: ReactNode;
    scrollable?: boolean;
};

export default function Container({ children, scrollable = true }: ContainerProps) {
    if (scrollable) {
        return (
            <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
                {children}
            </ScrollView>
        );
    }
    return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 24,
        backgroundColor: colors.background,
        justifyContent: 'center',
    },
});
