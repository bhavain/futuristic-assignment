import React, { Component } from 'react';
import { Icon, Content, Container } from 'native-base';
import { Animated, Easing, View, Text, Image, TouchableOpacity, StyleSheet, ToastAndroid, Button, Alert } from 'react-native';
import styles from './style.js';
import style from './style.js';

export default class ItemCard extends Component {
    
    state = {
        fadeAnim: new Animated.Value(0),
        modalVisible: false,
        x: new Animated.Value(0),
        x2: new Animated.Value(100),

      };
    

      slide = () => {
          if(!this.state.modalVisible && !this.props.editable)
          {
            Animated.spring(this.state.x, {
                toValue: -100,
                useNativeDriver:true
                }).start();
                Animated.spring(this.state.x2, {
                    toValue: -100,
                    useNativeDriver:true
                    }).start();
            this.setState({modalVisible: true}); 
        }
        else 
        { 
            Animated.spring(this.state.x, {
                toValue: 0,
                useNativeDriver:true
                }).start();
                Animated.spring(this.state.x2, {
                    toValue: 100,
                    useNativeDriver:true
                    }).start();
            this.setState({modalVisible: false});
        }
      };

      removeItem = (product) => {
        Alert.alert(
            '',
            `Are you sure want to delete the product ${product.trackName} ?`,
            [
                {text: 'Yes', onPress: ()=> {this.props.removeItem()
                    Animated.spring(this.state.x, {
                        toValue: 0,
                        useNativeDriver:true
                        }).start();
                        Animated.spring(this.state.x2, {
                            toValue: 100,
                            useNativeDriver:true
                            }).start();
                    this.setState({modalVisible: false});}},
                
                {
                text: 'No',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
                },
                
            ],
            {cancelable: true},
            );
          
          
      }

    render() {
        const item = this.props.item
        return (
        <View  style={{flexDirection:'row'}}>
        <Animated.View style={[{transform: [
              {
                translateX: this.state.x
              }
            ]
          }]}
        >
            <TouchableOpacity onPress={this.slide} style={styles.content}>
            <View style={{flexDirection:"row"}}>
            <Image source={{uri:item.artworkUrl100}} style={{width: 60, height: 60}} resizeMode='cover' />
            <View style={{flexDirection:"column",paddingLeft:16,width:!this.props.editable?"80%":"60%"}}>
              <Text numberOfLines={2} style={{fontSize:14, paddingBottom:12}}>{item.trackName}</Text>
                <Text style={{fontSize:16, color:"#222931"}}>
                    ₹ {item.trackPrice} {!this.props.editable?<Text>x{item.count} &nbsp;&nbsp;₹ {item.trackPrice*item.count}</Text>:null}</Text>
            </View>
            </View>
            {this.props.editable &&
            <View style={{flexDirection:"row",alignSelf:"center"}}>
              <TouchableOpacity onPress={()=>this.props.decrementCount(item)}>
                <Image style={{width:24,height:24}} resizeMode="contain" source={require('../../../assets/images/decrement.png')}/>
              </TouchableOpacity>
              <Text style={styles.count}>{item.count}</Text>
              <TouchableOpacity onPress={()=>this.props.incrementCount(item)}>
                <Image style={{width:24,height:24}} resizeMode="contain" source={require('../../../assets/images/increment.png')}/>
              </TouchableOpacity>
            </View>
            }
            </TouchableOpacity>
            </Animated.View>
        <Animated.View style={[styles.removeButton,{transform: [
              {
                translateX: this.state.x2
              }
            ]
          }]}
        >
            <TouchableOpacity style={styles.removeButton} onPress={()=>this.removeItem(item)}>
                <Text style={{color:"white"}}>Remove</Text>
            </TouchableOpacity>
        </Animated.View>
        </View>
        )
    }
}