import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firebase from "../../firebaseConnection";

export default function Home() {

    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cidade, setCidade] = useState("");
    const [usuario, setUsuario] = useState("");

    async function cadastrarUsuario() {
        await firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((value) => {
                firebase.database().ref("usuarios").child(value.user.uid).set({
                    cidade: cidade,
                });
                alert("Usuario cadastrado com sucesso" + ' ' + value.user.email);
                setEmail("");
                setPassword("");
                setCidade("");
            })
            .catch((error) => {
                alert("Algo deu errado");
                return;
            });
    }

    async function login() {
        await firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((value) => {
                alert("Bem vindo(a):" + value.user.email);
                setUsuario(value.user.email);
            })
            .catch((error) => {
                alert("Algo deu errado");
                return;
            })
        setEmail("");
        setPassword("");
        setCidade("");
    }

    async function logout() {
        await firebase.auth().signOut();
        setUsuario("");
        alert("Deslogado com sucesso");
    }

    return (
        <View style={styles.container}>
            <Text style={styles.principal}>Cadastrar/Logar na Plafatorma</Text>

            <Text style={styles.texto}>E-mail:</Text>
            <TextInput
                style={styles.input}
                underlineColorAndroid="transpartent"
                onChangeText={(texto) => setEmail(texto)}
                value={email}
            />

            <Text style={styles.texto}>Senha:</Text>
            <TextInput
                style={styles.input}
                secureTextEntry={true}
                underlineColorAndroid="transpartent"
                onChangeText={(texto) => setPassword(texto)}
                value={password}
            />

            <Text style={styles.texto}>Cidade:</Text>
            <TextInput
                style={styles.input}
                underlineColorAndroid="transpartent"
                onChangeText={(texto) => setCidade(texto)}
                value={cidade}
            />
            <Button title="Cadastrar Acesso" onPress={cadastrarUsuario} />

            {usuario.length > 0 ?
                (
                    <Button  title="Sair do sistema" onPress={logout} />
                ) :
                (
                    <Button  title="Logar na plataforma" onPress={login} />
                )
            }

                {usuario.length > 0 ?
                (
                    <Text style={styles.texto}>Usuário logado:{usuario}</Text>
                ) :
                (
                    <Text style={styles.texto}>Sem usuário logado no momento</Text>
                )
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
    },
    texto: {
        fontSize: 20,
      },
      input: {
        marginBottom: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: "#121212",
        height: 45,
        fontSize: 17,
      },
      principal: {
        fontSize: 25,
        fontWeight: 600,
        textAlign: "center",
      }
})