import React from 'react';
import {Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import CoinStack from './src/components/coins/CoinsStack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FavoritesStack from './src/components/favorites/FavoriteStack';
import colors from './src/res/colors';

const Tabs = createBottomTabNavigator();

const App: () => React$Node = () => {
    return (
        <NavigationContainer>
            <Tabs.Navigator
                tabBarOptions={{
                    tintColor: colors.charade,
                    style: {
                        backgroundColor: colors.blackPearl,
                    }
                }}
            >
                <Tabs.Screen
                    name="Coins"
                    component={CoinStack}
                    options={{
                        tabBarIcon: ({size, color}) => (
                            <Image
                                style={{
                                    tintColor: color,
                                    width: size,
                                    height: size,
                                }}
                                source={require('cryptoTracker/src/assets/bank.png')}
                            />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="Favorites"
                    component={FavoritesStack}
                    options={{
                        tabBarIcon: ({size, color}) => (
                            <Image
                                style={{
                                    tintColor: color,
                                    width: size,
                                    height: size,
                                }}
                                source={require('cryptoTracker/src/assets/star.png')}
                            />
                        ),
                    }}
                />
            </Tabs.Navigator>
        </NavigationContainer>
    );
};

export default App;
