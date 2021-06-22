import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, TextInput, FlatList, ActivityIndicator } from 'react-native';
import firebase from "../../firebaseConnection";
import Listagem from '../../components/Listagem'

export default function Sobre() {
    const [nome, setNome] = useState("");
    const [mmr, setMmr] = useState("");
    const [posicao, setPosicao] = useState("");
    const [organizacao, setOrganizacao] = useState("");
    const [apelido, setApelido] = useState("");
    const [dota2, setDota2] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function dados() {
          await firebase
            .database()
            .ref("dota2")
            .on("value", (snapshot) => {
              setDota2([]);
              snapshot.forEach((childItem) => {
                let data = {
                  key: childItem.key,
                  nome: childItem.val().nome,
                  mmr: childItem.val().mmr,
                  posicao: childItem.val().posicao,
                  organizacao: childItem.val().organizacao,
                  apelido: childItem.val().apelido,
                };
                setDota2((oldArray) => [...oldArray, data].reverse());
              });
              setLoading(false);
            });
        }
        dados();
      }, []);

      async function cadastrar() {
        if (
          (nome !== "") &
          (mmr !== "") &
          (posicao !== "") &
          (organizacao !== "") &
          (apelido !== "")
        ) {
          let dota2 = await firebase.database().ref("dota2");
          let chave = dota2.push().key;
    
          dota2.child(chave).set({
            nome: nome,
            mmr: mmr,
            posicao: posicao,
            organizacao: organizacao,
            apelido: apelido,
          });
          alert("Jogador Cadastrado com sucesso!");
          setMmr("");
          setNome("");
          setPosicao("");
          setOrganizacao("");
          setApelido("");
        } else {
          alert("Preencha o formulario de Cadastro de Jogador");
        }
      }

    return(
        <View style={styles.container}>
            <Text style={styles.principal}>Cadastro de Pro Player de Dota2</Text>

            <Text style={styles.texto}>Nome: </Text>
            <TextInput
                style={styles.input}
                underlineColorAndroid="transpartent"
                onChangeText={(texto) => setNome(texto)}
                value={nome}
            />

            <Text style={styles.texto}>Mmr:</Text>
            <TextInput
                style={styles.input}
                underlineColorAndroid="transpartent"
                onChangeText={(texto) => setMmr(texto)}
                value={mmr}
            />

            <Text style={styles.texto}>Posicao:</Text>
            <TextInput
                style={styles.input}
                underlineColorAndroid="transpartent"
                onChangeText={(texto) => setPosicao(texto)}
                value={posicao}
            />

            <Text style={styles.texto}>Organizacao:</Text>
            <TextInput
                style={styles.input}
                underlineColorAndroid="transpartent"
                onChangeText={(texto) => setOrganizacao(texto)}
                value={organizacao}
            />

            <Text style={styles.texto}>Apelido:</Text>
            <TextInput
                style={styles.input}
                underlineColorAndroid="transpartent"
                onChangeText={(texto) => setApelido(texto)}
                value={apelido}
            />

            <Button title="Novo Cadastro" onPress={cadastrar} />


            {loading ? (
                <ActivityIndicator color="#121212" size={45} />
            ) : (
                <FlatList
                    keyExtractor={(item) => item.key}
                    data={dota2}
                    renderItem={({ item }) => <Listagem data={item} />}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10
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
      },
})