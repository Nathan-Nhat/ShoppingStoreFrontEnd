import {createStore, compose, applyMiddleware} from 'redux';
import RootReducers from '../Reducer/RootReducer';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../RootSaga/RootSaga'
const composeEnhancers = process.env.NODE_ENV !== 'production' &&
    typeof(window) === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        shouldHotReload : false
    }) : compose;
const sagaMiddleware = createSagaMiddleware();
const storeConfig = ()=>{
    const middleWares = [sagaMiddleware];
    const enhancers = [applyMiddleware(...middleWares)];
    const store = createStore(RootReducers, composeEnhancers(...enhancers));
    sagaMiddleware.run(rootSaga);
    return store;
}


export default storeConfig;