import React, {Component} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import colors from '../../res/colors';
class CoinDetailScreen extends Component {
    state = {
        coin: {},
    };

    getSymbol = (name) => {
        if (name) {
            const ref = name.toLowerCase().replace(' ', '-');
            return `https://c1.coinlore.com/img/16x16/${ref}.png`;
        }
    };

    componentDidMount() {
        const {coin} = this.props.route.params;
        this.props.navigation.setOptions({title: coin.symbol});
        this.setState({coin});
    }

    render() {
        const {coin} = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.subHeader}>
                    <Image style={styles.iconImage} source={{uri: this.getSymbol(coin.name)}} />
                    <Text> Nombre: {coin.name}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.charade,
        flex: 1,
    },
    subHeader: {
        backgroundColor: 'rgba(0, 0, 0 0.1)',
        padding: 16,
        flexDirection: 'row',
    },
    iconImage: {
        height: 25,
        width: 25,
    },
});
export default CoinDetailScreen;
