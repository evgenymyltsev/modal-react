import React 			        from 'react';
import { render } 				from 'react-dom';
import {
	createStore,
	applyMiddleware } 			from 'redux';
import thunk 					from 'redux-thunk';
import { composeWithDevTools } 	from 'redux-devtools-extension';
import { Provider } 			from 'react-redux';
import { AppContainer }         from 'react-hot-loader';
import registerServiceWorker 	from './registerServiceWorker';
import rootReducer 				from './rootReducer';

import App                      from './components/App';
import                               './style/index.less';

const store = createStore(
	rootReducer,
	composeWithDevTools(
		applyMiddleware(thunk)
	)
);

const rootElement = document.getElementById('app');

render(
	<AppContainer>
		<Provider store={store}>
			<App />
		</Provider>
	</AppContainer>,
	rootElement
);

if (module.hot) {
	module.hot.accept('./components/App', () => {
		const NextApp = require('./components/App').default;

		render(
			<AppContainer>
				<Provider store={store}>
					<NextApp />
				</Provider>
			</AppContainer>,
			rootElement
		);
	});
}
registerServiceWorker();