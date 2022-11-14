import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import NavigateCard2 from '../components/NavigateCard2';
import RideOptionsCard2 from '../components/RideOptionsCard2';

const Stack = createStackNavigator();

const MapNavigator = () => {
    return (
        <Stack.Navigator
        screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="NavigateCard2" component={NavigateCard2} />
            <Stack.Screen name="RideOptionsCard2" component={RideOptionsCard2} />
            
        </Stack.Navigator>
    );
}

export default MapNavigator;
