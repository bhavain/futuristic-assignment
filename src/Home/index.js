import React,{Component} from 'react';
import {View, Text, FlatList, ToastAndroid, TouchableOpacity, TextInput} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import { myConfig } from '../../config';
import { connect } from 'react-redux'
import { Container,  Icon } from 'native-base';
import ItemCard from '../Components/ItemCard'
import styles from './style'

const API = myConfig.URL;

class Home extends Component {

    state={
        products:[],
        searchText:'',
    }

   


    onSearch = async (text) => {

        this.setState({searchText:text})

        var countryCode = this.props.navigation.getParam("countryCode")
        var params = 'term='+text.replace(/ /, '+')+'&country='+countryCode+'&limit=15&entity=musicVideo&attribute=songTerm'

        await axios({
            method: 'post',
            url: API + 'search?'+params,
            headers: {
              'content-type': 'application/json; charset=utf-8',
            },
          }).then(async res => {
        
             let data = res.data.results.filter(song=>song.trackPrice && song.trackPrice>=0);
             console.log(JSON.stringify(res.data.results))
 
             if(this.props.cartobj.length===0)
             {
               data.forEach(element => {
               element['count'] = 0;
             });
             }
             else
             { 
              data.map(val1=>{
                
                 let item= this.props.cartobj.find(i2 => i2.trackId === val1.trackId)
                 if(item)
                 {
                   val1.count = item.count;
                 }
                 else
                 {
                   val1.count = 0;
                 }
 
             })
             }
 
 
       
             await this.setState({products:data})
       
       
           
        
          })
            .catch(err => {
        
              ToastAndroid.show(err.response,ToastAndroid.LONG)
              console.log("err"+err)
              //alert('user not found2')
        
            })
    }

    incrementCount =  async (product) =>{
      
        //if(product.count + 1 <= product.qty)
        //{
        
        if(product.count > 0)
        {
          product.count = product.count + 1;
          await this.props.addMore(product)
      
        }
        else if(product.count === 0)
        {
          product.count = 1;
          await this.props.addItemToCart(product)
          
        }
      
        // let tempTotal = this.state.totalPrice;
        // tempTotal = tempTotal + parseInt(product.price.replace(/\$/g, ''));
        // this.setState({totalPrice : tempTotal})
        console.log(this.props.cartobj)
        //console.log("--"+this.state.totalPrice)
      
      
      //}
      
      //else {
        //ToastAndroid.show("You cannot add this product more number of times",ToastAndroid.LONG)
      //}
      }
      
      decrementCount = async (product) =>{
      
        if(product.count === 1)
        {
          product.count = 0;
        await this.props.removeFromCart(product)
        
        }
        else if(product.count !== 1 && product.count > 1)
        {
          product.count = product.count -1;
          await this.props.delMore(product)
          
      
        }
        
        console.log(this.props.cartobj)
      
      }

    refresh = () => {
        this.setState({products:[],
            searchText:''})
    }


    render(){
        return (
            <Container style={styles.container}>
                <View style={{flexDirection:"row"}}>
                    {/* <Icon type="AntDesign" name='search' style={{color:"gray"}}/> */}
                    <TextInput 
                    placeholder='Enter Song Name'
                    
                    style={styles.input}
                    value={this.state.searchText} 
                    onChangeText={(text)=>this.onSearch(text)}
                    />
                </View>
                <FlatList 
                data={this.state.products}
                keyExtractor={(item, index) => index}
                ListEmptyComponent={()=><View><Text>No Songs!</Text></View>}
                ItemSeparatorComponent={()=><View style={{height:8}}></View>}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => {
                    return (
                        <ItemCard item={item} incrementCount={this.incrementCount} decrementCount={this.decrementCount} editable={true}/>
                    )
                }}
                />
                {this.props.cartobj.length!==0 &&
                <LinearGradient start={{ x: 0, y: 0.75 }} end={{ x: 1, y: 0.25 }} colors={['#0671eb', '#00afdd']} style={styles.linearGradient_}>
                                <View style={styles.cart}>
                                    <View>
                                        <Text style={{fontSize:12,color:"white",fontFamily:"SF-Pro-Display-Semibold"}}>
                                        {this.props.cartobj.length} items added
                                        </Text>
                                        <Text style={[styles.buttonText]} >
                                        ₹{this.props.totalPrice}
                                        </Text>
                                    </View>
                                    <TouchableOpacity onPress={()=>this.props.navigation.navigate("Checkout",{refresh:this.refresh})}
                                                        style={{backgroundColor:"#014253", width:40, height: 40, borderRadius:7, alignItems:"center",justifyContent:"center"}}>
                                    <Icon type="AntDesign" name='arrowright' style={{color:"white"}}/>
                                    </TouchableOpacity>
                                    </View>
                </LinearGradient>
                }
            </Container>
        )
    }
}


const mapStateToProps2 = (state) =>{
  
    return {
  
        cartobj:state.cartobj,
        totalPrice:state.totalPrice
  
    }
  
  }
  
  const mapDispatchToProps = (dispatch) => ({
  
    addItemToCart: (product) => dispatch({ 
      type:'ADD_TO_CART',payload: product
    }),
    addMore: (product) => dispatch({
      type:'ADD_MORE',payload: product
    }),
    delMore: (product) => dispatch({
      type:'DEL_MORE',payload: product
    }),
    removeFromCart: (product) => dispatch({
      type:'REMOVE_FROM_CART',payload: product
    }),
  
  }); 
  
  export default connect(mapStateToProps2,mapDispatchToProps)(Home)
  
  
  
  
  