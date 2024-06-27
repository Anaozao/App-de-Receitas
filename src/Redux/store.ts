import { composeWithDevTools } from '@redux-devtools/extension'
import {applyMiddleware, legacy_createStore as createStore} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './Reducers/rootReducer'

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

export default store;