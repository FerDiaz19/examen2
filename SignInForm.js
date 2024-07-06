import React, { useState } from 'react';
import { Button, TextInput, View } from 'react-native';
import firebase from './firebase.js';

const SignInForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = () => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                console.log('User signed in successfully!');
            })
            .catch(error => {
                console.error('Error signing in:', error);
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
            <Button title="Sign In" onPress={handleSignIn} />
        </View>
    );
};

export default SignInForm;
