//this is a higher order function, a function that takes a function as an argument

function createStore(reducer) {
    //set the initial state of the store
    let currentState = reducer(undefined, {});


    return {
        //gives us the current state at any time
        getState: () => currentState,
        //takes the action the user provides and passes it to the reducer
        dispatch: action => {
            currentState = reducer(currentState, action);
        }
    }
}

//State is always an object

const initialState = {
    favorites: []
};



function favoritesReducer(state = initialState, action) {

    switch(action.type) {
        case "ADD_FAVORITE": {
            const addedFavorite = action.payload.favorite;
            const favorites = [...state.favorites, addedFavorite];
            return { favorites };
        }
        case "REMOVE_FAVORITE": {
            const removedFavorite = action.payload.favorite;
            //filter(creates a new array with all the elements that do not match the condition, the one that does is left behind)
            const favorites = state.favorites.filter(favorite => favorite.id !== removedFavorite.id);
            return { favorites };
        }
        
        default:
            return state;
        }
    }

// const action = { type: "ADD_FAVORITE", payload: { favorite: { title: "story1", id: 1 } }}

//we call the higher order function and pass onto it the favoritesReducer function
const store = createStore(favoritesReducer);

//here we pass the action to the dispatch function
// store.dispatch(action);

//checking the current state
// console.log(store.getState());

export default store;