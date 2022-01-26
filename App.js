import React,{useEffect,useState,} from "react";
import {View,Text,Platform} from "react-native";
import messaging from "@react-native-firebase/messaging";
import Notification from "./src/Notification";

function App(){


  useEffect(()=>{
    Notification.appMount();

    return()=>{
      Notification.unMount();
    }
  })




  return(
    <View style={{flex:1,backgroundColor:'red'}}>
      <Text>
        App home
      </Text>
    </View>
  )
}

export default App;