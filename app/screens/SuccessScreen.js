import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Screen from '../components/Screen';
import tw from 'tailwind-react-native-classnames';
import Constants from 'expo-constants'
import tailwind from 'tailwind-react-native-classnames'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';

const SuccessScreen = () => {
    //const { data } = route.params;
    const navigation = useNavigation()

    return (
        <Screen style={tw`bg-white h-full justify-center`}>
            <TouchableOpacity
                style={[tailwind`bg-white p-3 rounded-full shadow-lg`, { top: Constants.statusBarHeight, left: 20, position: 'absolute', zIndex: 100 }]}
                onPress={() => navigation.navigate("Home")}
            >
                <Icon
                    type="antdesign"
                    name="home"
                    color="black"
                    size={16}
                />
            </TouchableOpacity>
            <View style={tw`self-center`}>
                <View style={tw`p-5 w-full `}>
                    <Image
                        source={require('../assets/car_animation.gif')}
                        style={tw`w-60 h-40`}
                    />
                </View>
            </View>
        </Screen>
    );
}

export default SuccessScreen;
