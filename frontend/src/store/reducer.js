import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customizationReducer';

// ==============================|| COMBINE REDUCER ||============================== //
/*combineReducers is a utility function provided by Redux, which takes an object with key-value pairs 
where the keys represent the  "slice" of the state, and the values are the reducer functions responsible 
for managing that specific slice of the state. In this example, the customization key is associated with 
the customizationReducer. */

// For python users like me a simple analogy as follows:
// customizationReducer is like the class, while customization is the object of which we can interact with it.

const reducer = combineReducers({
    customization: customizationReducer
});

export default reducer;
