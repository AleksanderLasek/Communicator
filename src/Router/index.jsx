const Router = ({ path, children }) => {
  return window.location.pathname === path ? children : null;
};

export default Router;
