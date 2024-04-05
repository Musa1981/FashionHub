const FashionReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_PRODUCTS':
            return action.payload;
        case 'ADD_TO_CART':
            // Implementera logik för att lägga till en produkt i varukorgen här
            return state;
        case 'REMOVE_FROM_CART':
            // Implementera logik för att ta bort en produkt från varukorgen här
            return state.filter(product => product.id !== action.payload); // Filtrera bort produkten med det angivna id:et
        default:
            return state;
    }
};

export default FashionReducer; 
