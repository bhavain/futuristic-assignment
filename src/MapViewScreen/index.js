import React, { Component } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Dimensions,FlatList, ToastAndroid, Linking, ActivityIndicator } from 'react-native';
import { Header, Container, Content,Icon, ListItem, Text,Card,CardItem, Title, Right, Left, Body, Button } from 'native-base';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import axios from 'axios';
const API = 'https://maps.googleapis.com/maps/api/geocode/json?';

const {width,height} = Dimensions.get("window");
export default class MapViewScreen extends Component {

    constructor() {
        super();
      }

    state= {
        region: {
            latitude: 20.5937,
            longitude: 78.9629,
            latitudeDelta: 100,
            longitudeDelta: 100,
          },
        marker: {LatLng:{
            latitude: 17.3850,
            longitude: 78.4867
        },
        title : "India",
        description : "IN"
    },

        };


        onDragEnd = async (coordinate) => {

            console.log(coordinate)

            await axios({
                method: 'post',
                url: API + 'latlng='+coordinate.latitude+','+coordinate.longitude+'&key=AIzaSyAAunMQx9_-Qs2I28LS51mwXAwfHpsj60E',
                headers: {
                  'content-type': 'application/json; charset=utf-8',
                },
              }).then(async res => {
                  console.log('res'+res)

                //console.log("res"+JSON.stringify(res.data.results[0].address_components.find(val=>val.types.includes("country")).long_name))
                var country = res.data.results[0].address_components.find(val=>val.types.includes("country"))

                var marker = {LatLng:coordinate,
                              title : country.long_name,
                              description : country.short_name
                             };
           
                this.setState({ marker });

               
            
              })
                .catch(err => {
            
                  ToastAndroid.show(err.response,ToastAndroid.LONG)
                  console.log("err"+err)
                  //alert('user not found2')
            
                })

      }

    async componentDidMount() {
    }


    render(){
        return (
            
            <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={this.state.region}
                showsUserLocation={true}
                showsCompass={true}
                >
                
                    <Marker
                      draggable
                      coordinate={this.state.marker.LatLng}
                      onDragEnd={(e) => this.onDragEnd(e.nativeEvent.coordinate)}
                      title={this.state.marker.title}
                      description={this.state.marker.description}
                      onCalloutPress={()=>this.props.navigation.navigate("Home",{countryCode:this.state.marker.description})}
                    />
                 
                </MapView>
                </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        position: 'absolute',
        height:height,
        width:width,
    
    justifyContent: 'flex-end',
    alignItems: 'center',

    },
    map: {
        ...StyleSheet.absoluteFillObject,
        
        
    },
   });