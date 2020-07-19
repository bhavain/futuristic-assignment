const initialState = { 
    cartobj:[],
    totalPrice:0,
  }; 
  
  
  const items = (state = initialState,action) =>{
      
      switch (action.type) {
   
  
        case 'ADD_TO_CART':
  
              {
                  return { 
                      ...state,
                      cartobj: [...state.cartobj, action.payload],
                      totalPrice: state.totalPrice + action.payload.trackPrice
                  }
              }
  
        case 'REMOVE_FROM_CART':
  
  
              let  result = state.cartobj.filter(prod => prod.trackId !== action.payload.trackId)
                {
                    return {
                        ...state,
                        cartobj: result,
                        totalPrice: state.totalPrice - action.payload.trackPrice
 
                    }
                }

        case 'REMOVE_ALL_FROM_CART':
    
                {
                    return {
                        ...state,
                        cartobj: [],
                        totalPrice: 0,
 
                    }
                }

  
        case 'ADD_MORE':

                var added = action.payload
                let resultIndex = state.cartobj.findIndex(item => item.trackId === action.payload.trackId)

                {
                    return {
                        ...state,
                        cartobj: state.cartobj.map((prod, i) =>{
                           return (
                            i === resultIndex ? state.cartobj[i] = added : prod 
                           )
                        }),
                        totalPrice: state.totalPrice + action.payload.trackPrice

                        
                        
                    }
                }

        case 'DEL_MORE':

                var removed = action.payload
                let resultIndex1 = state.cartobj.findIndex(item => item.trackId === action.payload.trackId)
                {
                    return {
                        ...state,
                        cartobj: state.cartobj.map((prod, i) =>{
                            return (
                             i === resultIndex1 ? state.cartobj[i] = removed : prod 
                            )
                         }),
                         totalPrice: state.totalPrice - action.payload.trackPrice

                    }
                }
  
        default: {
          return state
        }      
  
        
          
      }
   
   
   
   }
   
   export default items;