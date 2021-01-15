import React from 'react'
import PropTypes from 'prop-types'
import SplitPane from 'react-split-pane'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import history from '../history';

import App from '../App'
import { Link } from 'react-router-dom'
import StorageCloudContainer from '../containers/StorageCloudMain';
import StorageCloudAddRow from '../containers/StorageCloudAddRow';
import StorageCloudEditRow from '../containers/StorageCloudEditRow';
import {Button} from 'react-bootstrap';
import {GasolineIcon}  from './icons';

export const routePath = {
  root:'/',
  root_sb:'/sb',
  storeCloud:'/storeCloud',
  storeCloud_sb:'/sb/storeCloud',
  storeСloud_editrow:'/storeCloud/editrow',
  storeСloud_addrow:'/storeCloud/addrow',

}

const routes = [
  { path: routePath.root,
    exact: true,    
    main: () => <div>Home page</div>
  },
  { path: routePath.storeCloud,
    exact:true,
    main: () => <StorageCloudContainer/>
  },
  { path:routePath.storeСloud_editrow,
    main:() => <StorageCloudEditRow/> 
  },
  {
    path:routePath.storeСloud_addrow,
    main:()=><StorageCloudAddRow/> 
  },
]

const routes_sb = [
  { path: routePath.root_sb,
    exact: true,    
    main: () => <div>Home page</div>
  },
  { path: routePath.storeCloud_sb,
    exact:true,
    main: () => <StorageCloudContainer/>
  },
  { path:routePath.storeСloud_editrow,
    main:()=><h2>Edit table row</h2> 
  },
  {
    path:routePath.storeСloud_addrow,
    main:()=><StorageCloudAddRow/> 
  },
]


const styles = {
  background: ""
};

const styles1 = {
  background: '#000',
  width: '2px',
  cursor: 'col-resize',
  margin: '0 5px',
  height: '100%',
};

const Root = ({ store }) => (
  <Provider store={store}>
    <Router history={history}>
    <div style={{ display: 'flex' }}>
        <div style={{
          padding: '10px',
          width: '40%',
          background: '#fFFFFF'
        }}>
          <Route path="/sb">
            <SplitPane
                  split="vertical"
                  minSize={10}
                  defaultSize={100}
                  resizerStyle={styles1}
            > 
            <div>
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                  <li><Link to={routePath.root_sb}>Root sb</Link></li>
                  <li><Link to={routePath.root}>Root</Link></li>
                  <li><Link to={routePath.storeCloud_sb}>StoreCloud sb</Link></li>
                  <li><Link to={routePath.storeCloud}>StoreCloud</Link></li>
                  <li><Link to={routePath.storeСloud_addrow}>Add row</Link></li>
                  <li><Link to={routePath.storeСloud_editrow}>Edit row</Link></li>
                  <Button type='button' >
                      <GasolineIcon />
                  </Button>
              </ul>
            </div>
            <div>
              {routes_sb.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  exact={route.exact}
                  component={route.main}
                />
              ))}
            </div>
          </SplitPane>
          </Route>
          <Route path="/" exact>
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                  <li><Link to={routePath.root_sb}>Root sb</Link></li>
                  <li><Link to={routePath.root}>Root</Link></li>
                  <li><Link to={routePath.storeCloud_sb}>StoreCloud sb</Link></li>
                  <li><Link to={routePath.storeCloud}>StoreCloud</Link></li>
                  <li><Link to={routePath.storeСloud_addrow}>Add row</Link></li>
                  <li><Link to={routePath.storeСloud_editrow}>Edit row</Link></li>
              </ul>
          </Route>
          {routes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  exact={route.exact}
                  component={route.main}
                />
              ))}
        </div>
      </div>           
    </Router>
  </Provider>
);


Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root