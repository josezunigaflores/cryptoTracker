import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList, Alert} from 'react-native';
import FavoritesEmptyState from './FavoriteEmptyState';
import colors from '../../res/colors';
import Storage from '../../libs/storage';
import CoinsItem from '../coins/CoinsItem';

class FavoritesScreen extends Component {
    state = {
        favorites: [],
    };
    handlePress = (coin) => {
        this.props.navigation.navigate('Detail', {coin});
    };

    getFavorites = async () => {
        try {
            const allKeys = await Storage.instance.getAllKeys();
            const correctCoins = allKeys.filter((key) => key.includes('coin-'));
            const favs = await Storage.instance.multiGet(correctCoins);
            const coinsFav = favs.map((fav) => JSON.parse(fav[1]));
            this.setState({favorites: coinsFav});
        } catch (err) {
            Alert.alert('Alert', err.toString());
            console.log('err', err);
        }
    };

    componentDidMount() {
        this.props.navigation.addListener('focus', this.getFavorites);
    }

    componentWillUnmount() {
        this.props.navigation.removeListener('focus', this.getFavorites);
    }

    render() {
        const {favorites} = this.state;

        return (
            <View style={styles.container}>
                {favorites.length === 0 ? <FavoritesEmptyState /> : null}
                {favorites.length > 0
                    ? ((
                          <FlatList
                              data={favorites}
                              renderItem={({item}) => (
                                  <CoinsItem
                                      item={item}
                                      onPress={() => {
                                          this.handlePress(item);
                                      }}
                                  />
                              )}
                          />
                      ): null)
                    : null}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.blackPearl,
        flex: 1,
    },
});

export default FavoritesScreen;
