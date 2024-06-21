import Loadable from 'react-loadable';
import { emptyNullFunc } from 'defaults';

export default Loadable({
  loader: () => import('./SocialButtonComp'),
  loading: emptyNullFunc,
});
