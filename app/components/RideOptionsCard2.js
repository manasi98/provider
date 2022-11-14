import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native'
import tailwind from 'tailwind-react-native-classnames'
import { Icon } from 'react-native-elements'
import Screen from './Screen'
import { useSelector } from 'react-redux'
import { selectDestination, selectOrigin, selectTravelTimeInformation } from '../redux/slices/navSlice'
import CustomMultiPicker from "react-native-multiple-select-list";

export const sendData = []
const data = [
    {
        id: "Uber-X-123",
        title: "Riya Bhargava",
       
    },
    {
        id: "Uber-XL-456",
        title: "Abhijeet Vaghela",
       
    },
    {
        id: "Uber-XL-911",
        title: "Alex John",
        
    },
    {
        id: "Uber-LUX-123",
        title: "Manasi Barhanpurkar",
        
    },
]

const SEARCH_CHARGE_RATE = 1.5
const RideOptionsCard2 = () => {
    const navigation = useNavigation()
    const [selected, setSelected] = useState(null)
    const [isSelected,setSelectedVisibility] = useState(false)
    const [isAccepted,setAcceptance] = useState(false)
    const travelTimeInformation = useSelector(selectTravelTimeInformation)
    const origin = useSelector(selectOrigin)
    const destination = useSelector(selectDestination)

return (
<CustomMultiPicker
  options={data}
  search={false} // should show search bar?
  multiple={true} //
  returnValue={["value"]} // label or value
  callback={(res)=>{ console.log(res) }} // callback, array of selected items
  rowBackgroundColor={"#eee"}
  rowHeight={40}
  rowRadius={5}
  iconColor={"#00a2dd"}
  iconSize={30}
  selectedIconName={"ios-checkmark-circle-outline"}
  unselectedIconName={"ios-radio-button-off-outline"}
  scrollViewHeight={130}
  selected={[]} // list of options which are selected by default
/>
)
}
export default RideOptionsCard2