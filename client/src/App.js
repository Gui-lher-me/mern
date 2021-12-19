import { routeComponents } from './routeComponents';

import { BrowserRouter as Router } from 'react-router-dom';

import { MainNavigation } from './shared/Navigation/MainNavigation';

export const App = () => {
    return (
        <Router>
            <MainNavigation />
            <main>{routeComponents}</main>
        </Router>
    );
};
