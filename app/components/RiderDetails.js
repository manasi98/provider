import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View, Alert,Platform,Linking } from 'react-native'
import tailwind from 'tailwind-react-native-classnames'
import { Icon, Card } from 'react-native-elements'
import Screen from './Screen'
import { useSelector } from 'react-redux'
import { selectDestination, selectOrigin, selectTravelTimeInformation } from '../redux/slices/navSlice'
import { Root, Popup } from 'react-native-popup-confirm-toast'
import { sendData } from './RideOptionsCard'


const SEARCH_CHARGE_RATE = 1.5
const sendData2 = sendData

const RiderDetails = () => {

    const [{ title1,multiplier1 ,rating,gender,since}] = sendData2.params;
    const navigation = useNavigation()
    // const [selected, setSelected] = useState(null)
    const travelTimeInformation = useSelector(selectTravelTimeInformation)
    const origin = useSelector(selectOrigin)
    const destination = useSelector(selectDestination)

    useEffect(() =>{
        if(!origin || !destination) navigation.push('NavigateCard2')
    }, [origin, destination])

    const travelConst = (multiplier1) => {
        return ((travelTimeInformation?.duration?.value * SEARCH_CHARGE_RATE * multiplier1) / 100).toFixed(2)
    }

    const onChoose = () =>{
        console.log(title1)
        navigation.push('SuccessScreen', { data: {title: title1,multiplier : multiplier1, distance: travelTimeInformation?.distance?.text, time: travelTimeInformation?.duration.text, price: travelConst(multiplier1)} })
    }
    

    const openDialScreen = () => {
        let number = '';
        if (Platform.OS === 'ios') {
          number = 'telprompt:${091123456789}';
        } else {
          number = 'tel:${091123456789}';
        }
        Linking.openURL(number);
      };

      const openMessageApp = () => {
        let number = '';
        if (Platform.OS === 'ios') {
          number = 'telprompt:${091123456789}';
        } else {
          number = 'tel:${091123456789}';
        }
        Linking.openURL(`sms:091123456789`);
      };

      

    return (
        <Root>
        <Screen style={[tailwind`bg-white pl-3 pt-10 h-full`,{justifyContent:"center"}]}>
        <View style={{marginBottom:40, paddingTop:10, position: 'absolute', top: 0, left: 0, right: 0, bottom: 100, justifyContent: 'center', alignItems: 'center'}}>
        <Card containerStyle={{justifyContent:"center",width:"90%", alignItems:"left",alignSelf:"center",paddingBottom:20,
            shadowColor: '#171717',
            shadowOffset: {width: -2, height: 4},
            shadowOpacity: 0.2,
            shadowRadius: 3,
        }}
            title='HELLO WORLD'
            // image={require('')}>
            >
            <View style={{flex:1,flexDirection:"row"}}>
                <View style={{marginTop:"15%"}}>
                <Image 
                    
                    source={{
                        uri: 'https://i.pinimg.com/474x/4b/71/f8/4b71f8137985eaa992d17a315997791e.jpg'
                    }} 
                    style={{width: 100, height: 100, borderRadius: 400/ 2,borderColor:"grey",borderWidth:2}} 
                />
                </View>
                <View style={{marginLeft:15}}>
                    <View >
                        <Text style={tailwind`text-center text-black text-2xl font-bold`}>Rider Details</Text>
                    </View>
                    <FlatList
                        renderItem={({ item }) => (
                        <>
                        <View style={{flex:1,flexDirection:"row"}}>
                        <Text style={tailwind`text-center text-black text-xl`}>Name: </Text>
                        <Text style={tailwind`text-center text-black text-lg pl-5`}>{item.title1}</Text>
                    </View>
                    <View style={{flex:1,flexDirection:"row", marginTop:-5}}>
                        <Text style={tailwind`text-center text-black text-xl`}>Rating: </Text>
                        <Text style={tailwind`text-center text-black text-lg pl-5`}>{item.rating}</Text>
                        <Icon
                        type="antdesign"
                        name="star"
                        color="goldenrod"
                        size={20}
                        style={tailwind`pl-2 pt-0.5`}
                    />
                    </View>
                    <View style={{flex:1,flexDirection:"row",marginTop:-5}}>
                        <Text style={tailwind`text-center text-black text-xl`}>Gender: </Text>
                        <Text style={tailwind`text-center text-black text-lg pl-2`}>{item.gender}</Text>
                    </View>
                    <View style={{flex:1,flexDirection:"row",marginTop:-5}}>
                        <Text style={tailwind`text-center text-black text-xl`}>Rider Since: </Text>
                        <Text style={tailwind`text-center text-black text-lg pl-2`}>{item.since} years</Text>
                    </View>
                    <View style={{flex:1,flexDirection:"row",marginTop:0}}>
                    <TouchableOpacity
                        style={{
                            borderWidth:1,
                            borderColor:'rgba(0,0,0,0.2)',
                            alignItems:'center',
                            justifyContent:'center',
                            width:40,
                            height:40,
                            backgroundColor:'#01a699',
                            borderRadius:50,
                            }}
                            onPress={()=>openDialScreen()}
                    >
                        <Icon name="phone" type="fontawesome" size={30} color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            borderWidth:1,
                            marginHorizontal:30,
                            borderColor:'rgba(0,0,0,0.2)',
                            alignItems:'center',
                            justifyContent:'center',
                            width:40,
                            height:40,
                            backgroundColor:'cornflowerblue',
                            borderRadius:50,
                            
                            }}
                            onPress={()=>openMessageApp()}
                    >
                        <Icon name="chat-bubble" type="materialicons" size={25} color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            borderWidth:1,
                            borderColor:'rgba(0,0,0,0.2)',
                            alignItems:'center',
                            justifyContent:'center',
                            width:40,
                            height:40,
                            backgroundColor:'firebrick',
                            borderRadius:50,
                            
                            }}
                            onPress={() =>
                                Alert.alert(
                                    'Cancel Ride',
                                    'Are you sure you want to cancel the ride?', // <- this part is optional, you can pass an empty string
                                    [
                                      {text: 'Cancel', onPress: () => console.log('OK Pressed')},
                                      {text: 'Confirm', onPress: () => 
                                      Alert.alert(
                                          'Cancel Ride',
                                          'Your ride has been cancelled!', // <- this part is optional, you can pass an empty string
                                          [{text: 'Go Home',onPress:() => navigation.push('NavigateCard2')}],
                                          {cancelable: false},
                                        )},
                                    ],
                                    {cancelable: false},
                                  )
                              }
                    >
                        <Icon name="cross" type="entypo" size={25} color="white" />
                    </TouchableOpacity>
                    </View>
                    
                    </>
                



                    )}
                    />
                    
                    </View>
                </View>  
            
            
        </Card>
        </View>
            {/* <View> */}
                <TouchableOpacity
                    style={[tailwind`bg-black py-3 mr-4 rounded-lg`,{backgroundColor:"olivedrab",position:"center",position: 'relative', top: 100, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}]}
                    onPress={onChoose}
                
                >
                    <Text style={tailwind`text-center text-white text-xl`}>Continue</Text>
                </TouchableOpacity>
            {/* </View> */}

        </Screen>
        </Root>
    )
}

export default RiderDetails

const styles = StyleSheet.create({
    image: {
        width: 100,
        height: 100,
        resizeMode: 'contain'
    }
})
