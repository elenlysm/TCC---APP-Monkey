import React from 'react';
import { ScrollView, View } from 'react-native';
import { LoginForm } from '../components/LoginForm';
import { SignupForm } from '../components/SignupForm';
import { styles } from '../styles/ChooseScreen.styles';

export default function ChooseScreen() {
    return (
        <ScrollView
            pagingEnabled
            showsVerticalScrollIndicator={false}
            style={styles.container}
        >
            <View style={styles.page}>
                <LoginForm />
            </View>
            <View style={styles.page}>
                <SignupForm />
            </View>
        </ScrollView>
    );
}
