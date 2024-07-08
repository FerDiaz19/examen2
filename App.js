import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import { useEffect, useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCcgnZJT1LXj-MlqLXacNHKDul-t_3Wu1s",
    authDomain: "carbon-theorem-413821.firebaseapp.com",
    projectId: "carbon-theorem-413821",
    storageBucket: "carbon-theorem-413821.appspot.com",
    messagingSenderId: "123556942802",
    appId: "1:123556942802:android:8fe08b28cba6d2ee9d2e0b"
};

const app = initializeApp(firebaseConfig);

const AuthScreen = ({ email, setEmail, password, setPassword, isLogin, setIsLogin, handleAuthentication, error }) => {
  return (
    <View style={styles.authContainer}>
      <Text style={styles.title}>{isLogin ? 'Sign In' : 'Sign Up'}</Text>
      {error && <Text style={styles.errorText}>{error}</Text>}
      <TextInput style={styles.input}
        value={email}
        placeholder="Email"
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput style={styles.input}
        value={password}
        placeholder="Password"
        onChangeText={setPassword}
        secureTextEntry
      />
      <View style={styles.buttonContainer}>
        <Button title={isLogin ? 'Sign In' : 'Sign Up'}
          color="#0c870c"
          onPress={handleAuthentication}
        />
      </View >
      <View style={styles.bottomContainer}>
        <Text style={styles.toggleText} onPress={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Need an account? Sign up' : 'Already have an account? Sign In'}
        </Text>
      </View>
    </View>
  );
}

const AuthenticatedScreen = ({ user, handleLogout }) => {
  return (
    <View style={styles.authContainer}>
      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.emailText}>{user.email}</Text>
      <Button
        title="Logout"
        color="#0e0bd9"
        onPress={handleLogout}
      />
    </View>
  );
}

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');

  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        setEmail('');
        setPassword('');
        setError('');
      }
    });
    return () => unsubscribe();
  }, [auth]);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleAuthentication = async () => {
    setError('');
    if (!validateEmail(email)) {
      setError('Invalid email format');
      return;
    }

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        console.log('User signed in successfully');
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        console.log('User created successfully');
      }
    } catch (error) {
      console.error('Authentication error:', error.message);
      setError(error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('User logged out successfully');
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error.message);
      setError(error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {user ? (
        <AuthenticatedScreen user={user} handleLogout={handleLogout} />
      ) : (
        <AuthScreen
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          handleAuthentication={handleAuthentication}
          error={error}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: 'center', alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  authContainer: { width: '80%', maxWidth: 400, backgroundColor: '#fff', padding: 16,
    borderRadius: 8,
    elevation: 3,
  },
  title: { fontSize: 24, marginBottom: 16,
    textAlign: 'center',
  },
  input: { height: 40, borderColor: '#ddd', borderWidth: 1, marginBottom: 16,
    padding: 8,
    borderRadius: 4,
  },
  buttonContainer: {
    marginBottom: 16,
  },
  toggleText: { color: '#1f781e', textAlign: 'center', 
  },
  bottomContainer: { marginTop: 20, 
  },
  emailText: { fontSize: 18, textAlign: 'center',
    marginBottom: 20,
  },
  errorText: { color: 'red', marginBottom: 16,
    textAlign: 'center',
  },
});
