import React, { useState, Suspense } from 'react';
// import Lazy from './Lazy';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import Guard from './components/Guard';
// import Private from './components/Private';
// import { AuthenticationProvider } from './components/withAuthentication';
// import { AUTH_ROUTE } from './Routes';

const Lazy = React.lazy(() => import(/* webpackChunkName: "lazy" */ './Lazy'));

const App = () => {
  const [show, setShow] = useState(false);

  return (
    <Router>
      <Route path="/test">
        <button onClick={() => setShow(true)}>show lazy</button>
        {show && (
          <Suspense fallback={<p>loading</p>}>
            <Lazy />
          </Suspense>
        )}
      </Route>
    </Router>
    // <AuthenticationProvider>
    //   <Router>
    //     <Switch>
    //       <Route path={AUTH_ROUTE.path}>
    //         <AUTH_ROUTE.component />
    //       </Route>
    //       <Route path="/">
    //         <Guard>
    //           <Private />
    //         </Guard>
    //       </Route>
    //     </Switch>
    //   </Router>
    // </AuthenticationProvider>
  );
};

export default App;
