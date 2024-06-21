import React from 'react';
import PropTypes from 'prop-types';
import {
  emptyArr,
  emptyObj,
  APPROVED,
  DECLINED,
  PENDING,
  PUBLIC_USER,
  REQUESTED,
} from 'defaults';
import { withSub } from 'client/lib/sub';
import { getUser } from 'reducers/user/selectors';
import styles from './css/request.css';

function RequestsItemUser(props) {
  const { request = emptyObj, user, incoming, t } = props;

  const { profilePicture, username } = user || emptyObj;

  if (!username) {
    return null;
  }

  const { accepted, declined } = request;

  const pending = !accepted && !declined;

  return (
    <div className={styles.owned}>

      <div
        className={styles.ownerImg}
        style={profilePicture ? {
          backgroundImage: `url("${profilePicture}")`,
        } : null}
      />

      <span
        dangerouslySetInnerHTML={{
          __html: t([incoming && pending ?
            REQUESTED :
            (accepted ?
              (incoming ? 'approvedFrom' : APPROVED) :
              (declined ?
                (incoming ? 'declinedFrom' : DECLINED) :
                PENDING
              )
            ),
          ], { username }),
        }}
      />

    </div>
  );
}

RequestsItemUser.displayName = 'RequestsItemOwner';

RequestsItemUser.propTypes = {
  request: PropTypes.object,
  user: PropTypes.object,
  incoming: PropTypes.bool,
  t: PropTypes.func,
};

export default withSub(RequestsItemUser, function requestUser({ userId }) {
  if (userId) {
    return [{
      name: PUBLIC_USER,
      props: {
        userId,
      },
    }];
  }

  return emptyArr;
}, function mapStateToProps(state, { userId }) {
  return {
    user: getUser(state, userId),
  };
});
