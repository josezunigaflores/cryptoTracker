import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import colors from '../../res/colors';
const CoinsItem = ({item}) => {
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.symbolText}>{item.symbol}</Text>
                <Text style={styles.nameText}> {item.name} </Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.percentText}>{item.percent_change_1h}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
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
    },
    row: {
        flexDirection: 'row',
    },
    percentText: {
        color: colors.white,
        fontSize: 12,
    },
});

export default CoinsItem;
