import type { ComponentType } from 'react';

import { useNavigate } from 'react-router';

function withRouter<P>(WrappedComponent: ComponentType<P>) {
  return function (props: P) {
    const navigate = useNavigate();

    return <WrappedComponent {...props} navigate={navigate} />;
  };
}

export { withRouter };
