import {applyMiddleware, combineReducers, createStore, compose} from "redux";
import thunk from "redux-thunk";
import authReducer from "./components/auth/Reducer";
import newsReducer from "./components/news/reducer";


const middleware = [
    thunk
];

const rootReducer = combineReducers({
    auth: authReducer,
    news: newsReducer
});

 // In development, use the browser's Redux dev tools extension if installed
 const enhancers = [];
 const isDevelopment = process.env.NODE_ENV === 'development';
 if (isDevelopment && typeof window !== 'undefined' && window.devToolsExtension) {
   window.devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;
   enhancers.push(window.devToolsExtension());
 }

 const store = createStore(
    rootReducer,
    {},
    compose(applyMiddleware(...middleware), ...enhancers)
);
export default store;