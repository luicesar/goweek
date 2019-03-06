import React, { Component } from 'react';
import api from '../services/api';
import socket from 'socket.io-client';
import { View, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Tweet from '../components/Tweet';

export default class Timeline extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: 'Inicio',
        headerRight: (
            <TouchableOpacity onPress={() => navigation.navigate('New')}>
                <Icon
                    style={{ marginRight: 20 }}
                    name='add-circle-outline'
                    size={24}
                    color='#4BB0EE'
                />
            </TouchableOpacity>
        )
    });

    state = {
        tweets: [],
    };

    async componentDidMount() {

        this.subscribeToEvents();

        const response = await api.get('tweets');
        this.setState({ tweets: response.data });
    }

    subscribeToEvents = () => {

        //const baseURLApi: 'http://192.168.70.252:3000' // IP Maquina Trabalho
        const baseURLApi = 'http://192.168.1.11:3000'; // IP Maquina Meu Note

        const io = socket(baseURLApi);

        io.on('tweet', data => {
            this.setState({ tweets: [data, ...this.state.tweets] });
        });

        io.on('like', data => {
            this.setState({
                tweets: this.state.tweets.map(tweet =>

                    tweet._id === data._id ? data : tweet

                )
            });
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.tweets}
                    keyExtractor={tweet => tweet._id}
                    renderItem={({ item }) => <Tweet tweet={item} />}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    }
});
