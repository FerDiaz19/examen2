import React from 'react';
import { Text, View } from 'react-native';
import SignUpForm from './SignUpForm'; // Corregida la importación

const SignUpScreen = () => {
    return (
        <View>
            <Text>Sign Up Screen</Text>
            <SignUpForm />
        </View>
    );
};

export default SignUpScreen;
