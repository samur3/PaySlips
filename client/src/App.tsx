import * as React        from 'react';
import { Home }          from './modules/home/home';
import { Switch, Route } from 'react-router-dom';

import './App.css';

export const App = () => {
    return (<>
            <div className="App">
                <header id="app-header" className="App-header">
                    Generate Pay Slips
                </header>
                <div>
                    <Switch>
                        <Route exact path={'/'}>
                            <Home/>
                        </Route>
                        <Route>Page not found</Route>
                    </Switch>
                </div>
            </div>
        </>
    )
}

