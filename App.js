import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import CoinStack from './src/components/coins/CoinsStack';
const App: () => React$Node = () => {
    return (
        <NavigationContainer>
            <CoinStack />
        </NavigationContainer>
    );
};

export default App;
