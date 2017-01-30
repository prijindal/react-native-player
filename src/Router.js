import { createRouter } from '@exponent/ex-navigation';

import AppNavigator from './components/AppNavigator';
import Home from './pages/Home';
import Profile from './pages/Profile';
import User from './pages/User';
import Settings from './pages/Settings';

const Router = createRouter(() => ({
  app: () => AppNavigator,
  home: () => Home,
  profile: () => Profile,
  user: () => User,
  settings: () => Settings,
}));

export default Router;
