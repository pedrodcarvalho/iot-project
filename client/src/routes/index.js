import { useRoutes } from 'react-router-dom';

import LoginRoutes from './LoginRoutes';
import MainRoutes from './MainRoutes';

const ThemeRoutes = () => {
  return useRoutes([MainRoutes, LoginRoutes]);
};

export default ThemeRoutes;
