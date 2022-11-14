import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, TouchableOpacity, Image, Alert,Platform,Linking} from 'react-native';
import tailwind from 'tailwind-react-native-classnames'
import { Icon, Card } from 'react-native-elements'
import Screen from './Screen'
import { useSelector } from 'react-redux'
import { selectDestination, selectOrigin, selectTravelTimeInformation } from '../redux/slices/navSlice'
import { Root, Popup } from 'react-native-popup-confirm-toast'
import { sendData } from './RideOptionsCard'


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
const Item = ({ title, since, rating, gender }) => (
    <View style={styles.item}>
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
                    <View style={{flex:1,flexDirection:"row"}}>
                        <Text style={tailwind`text-center text-black text-xl`}>Name: </Text>
                        <Text style={tailwind`text-center text-black text-lg pl-5`}>{title}</Text>
                        </View>
                        <View style={{flex:1,flexDirection:"row", marginTop:-5}}>
                        <Text style={tailwind`text-center text-black text-xl`}>Rating: </Text>
                        <Text style={tailwind`text-center text-black text-lg pl-5`}>{rating}</Text>
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
                        <Text style={tailwind`text-center text-black text-lg pl-2`}>{gender}</Text>
                    </View>
                    <View style={{flex:1,flexDirection:"row",marginTop:-5}}>
                        <Text style={tailwind`text-center text-black text-xl`}>Rider Since: </Text>
                        <Text style={tailwind`text-center text-black text-lg pl-2`}>{since} years</Text>
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
            </View></View>
            
      
    </View>
  );
  
  const RiderDetails2 = () => {
    const navigation = useNavigation()
    const renderItem = ({ item }) => (
      <Item title={item.title1}
      since = {item.since}
      rating = {item.rating}
      gender = {item.gender} />
      
    );
    
  
    return (
      <><SafeAreaView style={styles.container}>
            <FlatList
                data={sendData}
                renderItem={renderItem}
                keyExtractor={item => item.id} />

        </SafeAreaView><TouchableOpacity
            style={[tailwind`bg-black py-3 m-3 rounded-lg`, { backgroundColor: "olivedrab" }]}
            onPress={() => navigation.push('SuccessScreen')}

        >
                <Text style={tailwind`text-center text-white text-xl`}>Start Carpooling </Text>
            </TouchableOpacity></>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    item: {
      backgroundColor: '#FFFFFF',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 22,
    },
    gender: {
        fontSize: 12,
      },
  });
  
  export default RiderDetails2;