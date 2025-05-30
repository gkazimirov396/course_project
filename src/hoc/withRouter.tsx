import type { ComponentType } from 'react';

import { useNavigate, useParams } from 'react-router';
export function withRouter<P>(WrappedComponent: ComponentType<any>) {
  return function (props: P) {
    const navigate = useNavigate();
    const params = useParams();

    return <WrappedComponent {...props} navigate={navigate} params={params} />;
  };
}
