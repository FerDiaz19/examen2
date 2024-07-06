import React, { useState } from 'react';
import { Button, TextInput, View } from 'react-native';
import firebase from './firebase.js';

const SignUpForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = () => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                console.log('User signed up successfully!');
            })
            .catch(error => {
                console.error('Error signing up:', error);
            });
    };

    return (
        <View>
            <TextInput
                placeholder="Email"
                onChangeText={setEmail}
                value={email}
            />
            <TextInput
                placeholder="Password"
                onChangeText={setPassword}
                value={password}
                secureTextEntry
            />
            <Button title="Sign Up" onPress={handleSignUp} />
        </View>
    );
};

export default SignUpForm;
