import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import colors from '../../res/colors';
const CoinsItem = ({item}) => {
    const getImageArrow = () => {
        if (item.percent_change_1h > 0) {
            return require('../../assets/arrow_up.png')
        }
        return require('../../assets/arrow_down.png')
    };

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.symbolText}>{item.symbol}</Text>
                <Text style={styles.nameText}> {item.name} </Text>
                <Text style={styles.priceText}> {`$${item.price_usd}`} </Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.percentText}>{item.percent_change_1h}</Text>
                <Image style={styles.imageIcon}
                    source={getImageArrow()}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        borderBottomColor: colors.zircon,
        borderBottomWidth: 1,
    },
    symbolText: {
        color: colors.white,
        fontWeight: 'bold',
        fontSize: 16,
        marginRight: 12,
    },
    nameText: {
        color: colors.white,
        fontSize: 14,
        marginRight: 16,
    },
    row: {
        flexDirection: 'row',
    },
    percentText: {
        color: colors.white,
        fontSize: 12,
        marginRight: 12,
    },
    priceText: {
        color: colors.white,
        fontSize: 14,
    },
    imageIcon: {
        width: 22,
        height: 22,
    },
});

export default CoinsItem;
