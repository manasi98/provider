import React, {useState} from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import tailwind from 'tailwind-react-native-classnames'
import Screen from './Screen'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
//import { GOOGLE_MAP_APIKEY } from '@env'
import { setDestination } from '../redux/slices/navSlice'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import NavFavourites from './NavFavourites'
import { Icon } from 'react-native-elements'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import * as Progress from 'react-native-progress';
//import RnIncrementDecrementBtn  from 'react-native-increment-decrement-button';
//import NumberPlease from "react-native-number-please";
import {Picker} from '@react-native-picker/picker';

const GOOGLE_MAP_APIKEY = "AIzaSyA2NZvrKgSRaGgu2FW3SMPPAAfwBtAGKgo"

const NavigateCard = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isDateVisible,setDateVisibility] = useState(false)
    const [isPassengerVisible,setPassengerVisibility] = useState(false)
    const [chosenDate,setChosenDate] = useState(moment(new Date()).format('DD-MM-YYYY hh:mm A'))
    //const initialValues = [{ id: "passengers", value: 1 }];
    //const [passengers, setPassengers] = useState(initialValues);
    //const passengerNumbers = [{ id: "passengers", label: "passengers", min: 1, max: 6 }];
    const [selectedNumber, setSelectedNumber] = useState();


    const showDatePicker = () => {
        setDatePickerVisibility(true);
      };
    
      const hideDatePicker = () => {
        setDatePickerVisibility(false);
      };

      const handleConfirm = (date) => {
        hideDatePicker();
        setChosenDate(moment(date).format('DD-MM-YYYY hh:mm A'))
        setDateVisibility(true)
      };
      const setBackDate = () => {
        setDateVisibility(false)
        setPassengerVisibility(false)
      }
      const setBackPassenger = () => {
        setPassengerVisibility(false)
      }

    return (
        <Screen style={tailwind`bg-white flex-1`}>
           <Text style={tailwind`text-left pb-3 pl-5 pt-2 text-xl font-bold`}>Welcome, Abhirup</Text>
            {isDateVisible &&
                <Text 
            style={[tailwind`text-left pb-1 pl-5 pt-0 font-bold`,{color:"indianred"}]}
            isVisible={isDateVisible}>Hosting ride for {chosenDate}</Text>
            }
            {isPassengerVisible &&
                <Text 
            style={[tailwind`text-left pb-1 pl-5 pt-0 font-bold`,{color:"indianred"}]}
            isVisible={isPassengerVisible}>Hosting ride for {selectedNumber} passengers</Text>
            }
            <View style={tailwind`border-t border-gray-100 flex-shrink relative z-20 bg-white`}>
                <View style={tailwind`bg-white pb-2`}>
                    <GooglePlacesAutocomplete
                        placeholder='Where to?'
                        nearbyPlacesAPI="GooglePlacesSearch"
                        debounce={400}
                        onPress={(data, details = null) => {
                            dispatch(setDestination({
                                loaction: details.geometry.location,
                                description: data.description
                            }))
                        }}
                        minLength={2}
                        fetchDetails={true}
                        returnKeyType={"search"}
                        onFail={error => console.error(error)}
                        query={{
                            key: GOOGLE_MAP_APIKEY,
                            language: 'en',
                        }}
                        styles={toInputBoxStyles}
                        enablePoweredByContainer={false}
                    />
                </View>
            </View>
            <View style={tailwind`px-3 bg-white relative z-10 justify-between flex-1`}>
                <NavFavourites />
                <View style={tailwind`mt-3 flex-row justify-evenly py-3 border-t border-gray-100`}>
                    
                    
                    {!isDateVisible && !isPassengerVisible &&
                    
                    <TouchableOpacity
                    style={[tailwind`bg-black py-3 m-3 rounded-lg`,{backgroundColor:"olivedrab"}]}
                    onPress={showDatePicker}
                >
                    <Icon name="calendar" type="font-awesome" color="black" size={14} />
                    <Text style={tailwind`text-center text-white text-xl`}>Schedule</Text>
                </TouchableOpacity>
                    }
                    {isDateVisible && !isPassengerVisible &&
                    <><View>
                            <Text>I can pickup</Text>
                            <Picker
                                selectedValue={selectedNumber}
                                onValueChange={(itemValue, itemIndex) =>{
                                    setSelectedNumber(itemValue)
                                    setPassengerVisibility(true)
                                    }
                                }>
                            <Picker.Item label="1" value="1" />
                            <Picker.Item label="2" value="2" />
                            <Picker.Item label="3" value="3" />
                            <Picker.Item label="4" value="4" />
                            <Picker.Item label="5" value="5" />
                            <Picker.Item label="6" value="6" />
                            </Picker>
                            <Text>Passengers</Text>
                            <TouchableOpacity
                        style={[tailwind`flex-row bg-white h-10 px-4 py-3 rounded-full border border-black`,{backgroundColor:"olivedrab"}]}
                        onPress={setBackDate}
                    >

                        <Icon name="calendar" type="font-awesome" color="black" size={14} />
                        <Text style={tailwind`text-black text-center pl-3`}>Back</Text>
                    </TouchableOpacity>
                    
                            
                        </View></>

                    }
                    {isDateVisible && isPassengerVisible &&
                    
                    <><TouchableOpacity
                    style={[tailwind`flex-row bg-white h-10 px-4 py-3 rounded-full border border-black`,{backgroundColor:"olivedrab"}]}
                    onPress={setBackDate}
                >

                        <Icon name="calendar" type="font-awesome" color="black" size={14} />
                        <Text style={tailwind`text-black pl-3`}>Back</Text>
                    </TouchableOpacity><TouchableOpacity
                            style={[tailwind`flex-row bg-white h-10 px-4 py-3 rounded-full border border-black`,{backgroundColor:"olivedrab"}]}
                            onPress={() => navigation.push('RideOptionsCard',selectedNumber)}
                        >

                            <Text style={tailwind`text-black text-center pr-3`}>Continue</Text>
                            <Icon name="arrow-right" type="font-awesome" color="black" size={14} />
                        </TouchableOpacity></>
                    }
                    
                    <DateTimePickerModal
                        style={{height:200}}
                        isVisible={isDatePickerVisible}
                        mode="datetime"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                    />
                </View>
            </View>
        </Screen>
    )
}

export default NavigateCard

const toInputBoxStyles = StyleSheet.create({
    container: {
        flex: 0,
        backgroundColor: '#fff',
        paddingTop: 20,
    },
    textInput: {
        fontSize: 15,
        backgroundColor: '#F4F4F4',
        borderRadius: 5,
        borderEndWidth: 1,
        borderColor: '#ddd'
    },
    textInputContainer: {
        paddingHorizontal: 20,
        paddingBottom: 0
    }
})
