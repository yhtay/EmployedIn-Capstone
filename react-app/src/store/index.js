import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import postsReducer from './posts';
import commentsReducer from './comments';
import skillsReducer from './skills';
import endorsementsReducer from './endorsements';

const rootReducer = combineReducers({
  session,
  posts: postsReducer,
  comments: commentsReducer,
  skills: skillsReducer,
  endorsements: endorsementsReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
