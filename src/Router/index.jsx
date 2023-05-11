const Router = ({ path, children }) => {
  const match = window.location.pathname === path || window.location.pathname.startsWith(`${path}/`);
  return match ? children : null;
};


export default Router;
