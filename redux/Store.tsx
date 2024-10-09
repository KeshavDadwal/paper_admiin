import { createStore, applyMiddleware, compose } from 'node_modules/redux'
import Reducers from './Reducer'
import ReduxThunk from 'redux-thunk'

export default createStore(Reducers, {}, applyMiddleware(ReduxThunk));

// const composeEnhancers =
//   typeof window === 'object' &&
//   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
//       // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
//     }) : compose;

// const enhancer = composeEnhancers(
//     applyMiddleware(ReduxThunk)
// );

// export default createStore(Reducers, enhancer);
