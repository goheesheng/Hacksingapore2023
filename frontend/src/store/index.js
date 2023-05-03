// https://redux.js.org/api/createstore
import { createStore } from 'redux';
import reducer from './reducer';

// ==============================|| REDUX - MAIN STORE ||============================== //
/*(Store): An object that holds the complete state of your app. The only way to change its state is by dispatching actions. 
You may also subscribe to the changes to its state to update the UI. */

const store = createStore(reducer);
const persister = 'Free';

export { store, persister };
