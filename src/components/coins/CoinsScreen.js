import React, {Component} from 'react';
import {View, FlatList, StyleSheet, ActivityIndicator} from 'react-native';
import Http from 'cryptoTracker/src/libs/http';
import CoinsItem from './CoinsItem';
import colors from '../../res/colors';
import CoinsSearch from './coinsSearch';
class CoinsScreen extends Component {
    state = {
        coins: [],
        allCoins: [],
        loading: false,
    };

    componentDidMount = async () => {
        this.setState({loading: true});
        const res = await Http.instance.get(
            'https://api.coinlore.net/api/tickers',
        );
        this.setState({coins: res.data,allCoins: res.data,  loading: false});
    };

    handleSearch= (query) => {
        const {allCoins} = this.state;
        const coinsFilters = allCoins.filter((coin) => {
            return coin.name.toLowerCase().includes(query.toLowerCase()) ||
                coin.symbol.toLowerCase().includes(query.toLowerCase())
        });
        this.setState({coins: coinsFilters})
    }

    handlePress = (coin) => {
        this.props.navigation.navigate('Detail', {coin});
    };

    render() {
        const {coins, loading} = this.state;
        return (
            <View style={style.container}>
                <CoinsSearch onChange={this.handleSearch}/>
                {loading ? (
                    <ActivityIndicator
                        style={style.loader}
                        color="#fff"
                        size="large"
                    />
                ) : null}
                <FlatList
                    data={coins}
                    renderItem={({item}) => (
                        <CoinsItem
                            item={item}
                            onPress={() => {
                                this.handlePress(item);
                            }}
                        />
                    )}
                />
            </View>
        );
    }
}

const style = StyleSheet.create({
    loader: {
        marginTop: 60,
    },
    container: {
        flex: 1,
        backgroundColor: colors.charade,
    },
    titleText: {
        color: '#fff',
        textAlign: 'center',
    },
    btn: {
        padding: 8,
        backgroundColor: 'blue',
        borderRadius: 8,
        margin: 16,
    },

    btnText: {
        color: 'white',
        textAlign: 'center',
    },
});

export default CoinsScreen;
