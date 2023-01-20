import { forwardRef } from 'react';
import { Link } from 'react-router-dom';

export const RouterLink = forwardRef<HTMLAnchorElement, { href: string }>(
  (props, ref) => {
    return <Link {...props} to={props.href} ref={ref} />;
  }
);
