import { createContext } from "react";
import { DUMMY_PRODUCTS } from "../dummy-products";
import { useReducer } from "react";
export const CartContext = createContext({
  items: [],
  addItemToCart: () => {},
  updateItemToCart: () => {},
});

//밖에 만드는 이유: 새로 함수가 재생성되지 않기 위함
//인수: state와 액션
//액션이 디스패치를 통해 보내진 후에 리듀서 함수 반환
//업데이트된 상태 반환
function shoppingCartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    const updatedItems = [...state.items];

    const existingCartItemIndex = updatedItems.findIndex(
      (cartItem) => cartItem.id === action.payload
    );
    const existingCartItem = updatedItems[existingCartItemIndex];

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      const product = DUMMY_PRODUCTS.find(
        (product) => product.id === action.payload
      );
      updatedItems.push({
        id: action.payload,
        name: product.title,
        price: product.price,
        quantity: 1,
      });

      return {
        //데이터 손실이 없도록 지난번 상태 복사
        ...state,
        items: updatedItems,
      };
    }
  }
  if (action.type === "UPDATE_ITEM") {
    const updatedItems = [...state.items];
    const updatedItemIndex = updatedItems.findIndex(
      (item) => item.id === action.payload.productId
    );

    const updatedItem = {
      ...updatedItems[updatedItemIndex],
    };

    updatedItem.quantity += action.payload.amount;

    if (updatedItem.quantity <= 0) {
      updatedItems.splice(updatedItemIndex, 1);
    } else {
      updatedItems[updatedItemIndex] = updatedItem;
    }

    return {
      ...state,
      items: updatedItems,
    };
  }

  return state;
}

export default function CartContextProvider({ children }) {
  //뒤의 인자로 초기상태 설정 가능
  const [shoppingCartState, shoppingCartDispatch] = useReducer(
    shoppingCartReducer,
    {
      items: [],
    }
  );



  function handleAddItemToCart(id) {
    shoppingCartDispatch({
      //각각의 action을 구분하기 위함
      type: "ADD_ITEM",
      payload: id, //전달 인자 설정
    });
    // -> action 매개 변수로 전달
  }

  function handleUpdateCartItemQuantity(productId, amount) {
    shoppingCartDispatch({
      type: "UPDATE_ITEM",
      payload: { productId, amount },
    });

  }

  const ctxValue = {
    items: shoppingCartState.items,
    addItemToCart: handleAddItemToCart,
    updateItemToCart: handleUpdateCartItemQuantity,
  };

  return (
    <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
  );
}
