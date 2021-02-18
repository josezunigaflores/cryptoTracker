import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    SectionList,
    FlatList,
    Pressable,
    Alert
} from 'react-native';
import colors from '../../res/colors';
import Http from '../../libs/http';
import CointMarketItem from './CoinMarketItem';
import Storage from '../../libs/storage';

class CoinDetailScreen extends Component {
    state = {
        coin: {},
        markets: [],
        isFavorite: false,
    };

    toogleFavorite = () => {
        if (this.state.isFavorite) {
            this.removeFavorite();
        } else {
            this.addFavorite();
        }
    };

    addFavorite = async () => {
        const coin = JSON.stringify(this.state.coin);
        const key = `coin-${this.state.coin.id}`;
        const ok = await Storage.instance.store(key, coin);
        if (ok) {
            this.setState({isFavorite: true});
        }
    };

    removeFavorite = async () => {
        Alert.alert('Remove favorite', 'Are you sure', [
            {
                text: 'Cancel',
                onPress: () => {},
                style: 'cancel',
            },
            {
                text: 'Remove',
                onPress: async () => {
                    await Storage.instance.remove(`coin-${this.state.coin.id}`);
                    this.setState({isFavorite: false});
                },
                style: 'destructive',
            },
        ]);
    };

    getFavorite = async () => {
        const key = `coin-${this.state.coin.id}`;
        try {
            const favStr = await Storage.instance.get(key);
            if (favStr != null) {
                this.setState({isFavorite: true});
            }
        } catch (err) {
            console.log('err', err);
        }
    };

    getSymbol = (name) => {
        if (name) {
            const ref = name.toLowerCase().replace(' ', '-');
            return `https://c1.coinlore.com/img/16x16/${ref}.png`;
        }
    };

    getMarkets = async (coinId) => {
        const url = `https://api.coinlore.net/api/coin/markets/?id=${coinId}`;
        const markets = await Http.instance.get(url);
        this.setState({markets});
    };

    componentDidMount() {
        const {coin} = this.props.route.params;
        this.props.navigation.setOptions({title: coin.symbol});
        this.getMarkets(coin.id);
        this.setState({coin}, () => {
            this.getFavorite();
        });
    }

    getSection = (coin) => {
        const section = [
            {
                title: 'Market cap',
                data: [coin.market_cap_usd],
            },
            {
                title: 'Volume 24H',
                data: [coin.volume24],
            },
            {
                title: 'Change 24 hrs',
                data: [coin.percent_change_24h],
            },
        ];
        return section;
    };

    render() {
        const {coin, markets, isFavorite} = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.subHeader}>
                    <View style={styles.row}>
                        <Image
                            style={styles.iconImage}
                            source={{uri: this.getSymbol(coin.name)}}
                        />
                        <Text style={styles.titleText}> {coin.name}</Text>
                    </View>
                    <Pressable
                        onPress={this.toogleFavorite}
                        style={[
                            styles.btnFavorite,
                            isFavorite
                                ? styles.btnFavoriteRemove
                                : styles.btnFavoriteAdd,
                        ]}>
                        <Text style={styles.btnFavoriteText}>
                            {isFavorite ? 'Remove Favorite' : 'Add Favorites'}
                        </Text>
                    </Pressable>
                </View>
                <SectionList
                    style={styles.sectionDetail}
                    sections={this.getSection(coin)}
                    keyExtractor={(item) => item}
                    renderItem={({item}) => (
                        <View style={styles.sectionItem}>
                            <Text style={styles.itemText}> {item}</Text>
                        </View>
                    )}
                    renderSectionHeader={({section}) => (
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionText}>
                                {section.title}
                            </Text>
                        </View>
                    )}
                />
                <Text style={styles.marketTitle}> Markets Places</Text>
                <FlatList
                    style={styles.list}
                    horizontal={true}
                    data={markets}
                    renderItem={({item}) => <CointMarketItem item={item} />}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.charade,
        flex: 1,
    },
    row: {
        flexDirection: 'row',
    },
    subHeader: {
        backgroundColor: 'rgba(0,0,0,0.1)',
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    titleText: {
        fontSize: 16,
        color: colors.white,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    iconImage: {
        height: 25,
        width: 25,
    },

    sectionHeader: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        padding: 8,
    },
    sectionItem: {
        padding: 8,
    },
    itemText: {
        color: colors.white,
    },
    marketTitle: {
        color: colors.white,
        fontSize: 16,
        marginBottom: 8,
        fontWeight: 'bold',
        marginLeft: 16,
    },
    sectionText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
    sectionDetail: {
        maxHeight: 250,
    },
    list: {
        maxHeight: 120,
        paddingLeft: 16,
    },
    btnFavorite: {
        padding: 8,
        borderRadius: 8,
    },
    btnFavoriteAdd: {
        backgroundColor: colors.picton,
    },
    btnFavoriteRemove: {
        backgroundColor: colors.carmine,
    },
    btnFavoriteText: {
        color: colors.white,
    },
});
export default CoinDetailScreen;
