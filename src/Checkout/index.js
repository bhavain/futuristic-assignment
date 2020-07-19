import React,{Component} from 'react';
import {View, Text, FlatList, TouchableOpacity, ToastAndroid} from 'react-native';
import { Icon, Content, Container } from 'native-base';
import { connect } from 'react-redux'
import ItemCard from '../Components/ItemCard'
import LinearGradient from 'react-native-linear-gradient';
import styles from './style'

class Checkout extends Component {

    removeItem = async (product) =>{
        product.trackPrice = product.trackPrice*product.count;
        product.count = 0;
        await this.props.removeFromCart(product)      
      }


    render(){
        return (
            <Container style={[styles.container]} >
                <Text style={{fontSize:20,marginVertical:16,fontWeight:"bold"}}>Order Details</Text>
                <FlatList 
                data={this.props.cartobj}
                keyExtractor={(item, index) => index}
                ListEmptyComponent={()=>this.props.navigation.goBack(null)}
                ItemSeparatorComponent={()=><View style={{height:8}}></View>}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => {
                    return (
                        <ItemCard item={item} removeItem={()=>this.removeItem(item)} editable={false}/>
                    )
                }}
                />
                <LinearGradient start={{ x: 0, y: 0.75 }} end={{ x: 1, y: 0.25 }} colors={['#0671eb', '#00afdd']} style={styles.linearGradient_}>
                        <TouchableOpacity onPress={()=>
                            {   this.props.emptyCart();
                                ToastAndroid.show("Order Placed",ToastAndroid.LONG);
                                this.props.navigation.state.params.refresh();
                                this.props.navigation.goBack(null);
                            }}>
                            <Text style={[styles.buttonText]} >
                                Place Order
                            </Text>
                        </TouchableOpacity>
            </LinearGradient>
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
  
    emptyCart: (product) => dispatch({
      type:'REMOVE_ALL_FROM_CART'
    }),
    removeFromCart: (product) => dispatch({
        type:'REMOVE_FROM_CART',payload: product
    }),
  
  }); 
  
export default connect(mapStateToProps2,mapDispatchToProps)(Checkout)



  
  
  
  
  