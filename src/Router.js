import { createRouter } from '@exponent/ex-navigation';

import AppNavigator from './components/AppNavigator';
import Home from './pages/Home';
import Song from './pages/Song';
import Settings from './pages/Settings';

const Router = createRouter(() => ({
  app: () => AppNavigator,
  home: () => Home,
  song: () => Song,
  settings: () => Settings,
}));

export default Router;
