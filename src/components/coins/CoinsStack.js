import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CoinsScreen from './CoinsScreen';
import CoinDetailScreen from './CoinDetailScreen';
import colors from '../../res/colors';

const Stack = createStackNavigator();

const CoinStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: colors.blackPearl,
                },
                headerTitleAlign: 'center',
                headerTintColor: colors.white,
            }}>
            <Stack.Screen name="Coins" component={CoinsScreen} />
            <Stack.Screen name="Detail" component={CoinDetailScreen} />
        </Stack.Navigator>
    );
};

export default CoinStack;
