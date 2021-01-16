export const initialState = {
    basket: [],
    user: null
  };
  
  // Selector
  export const getBasketTotal = (basket) => 
  // we have an initial amount, we have to iterate through each item. 
  // every time it loops through the item price, add the total amoutn; initial amount is 0
    basket?.reduce((amount, item) => item.price + amount, 0);
  
  const reducer = (state, action) => {
    switch (action.type) {
      case "ADD_TO_BASKET":
        return {
          ...state,
          basket: [...state.basket, action.item],
        };
        case "REMOVE_FROM_BASKET":
          const index = state.basket.findIndex(
            (basketItem) => basketItem.id === action.id
          );
          let newBasket = [...state.basket];
          index >= 0 ? newBasket.splice(index, 1) : console.warn(`Cannot remove product with an ID of ${action.id}`);
          return {
            ...state,
            basket: newBasket

          };
          case "EMPTY_BASKET": 
            return {
              ...state,
              basket: []
            }
          case "SET_USER":
            return {
              ...state,
              user: action.user
            }
      default:
        return state;
    }
  };
  
  export default reducer;
