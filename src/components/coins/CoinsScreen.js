import React, {Component} from 'react';
import {
    View,
    FlatList,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import Http from 'cryptoTracker/src/libs/http';
import CoinsItem from './CoinsItem';
import colors from '../../res/colors';

class CoinsScreen extends Component {
    state = {
        coins: [],
        loading: false,
    };

    componentDidMount = async () => {
        this.setState({loading: true});
        const res = await Http.instance.get(
            'https://api.coinlore.net/api/tickers',
        );
        this.setState({coins: res.data, loading: false});
    };

    handlePress = () => {
        console.log('go to detail', this.props);
        this.props.navigation.navigate('Detail');
    };

    render() {
        const {coins, loading} = this.state;
        return (
            <View style={style.container}>
                {loading ? (
                    <ActivityIndicator
                        style={style.loader}
                        color="#fff"
                        size="large"
                    />
                ) : null}
                <FlatList
                    data={coins}
                    renderItem={({item}) => <CoinsItem item={item} />}
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
