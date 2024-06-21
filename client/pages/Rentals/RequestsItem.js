import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import isFunction from 'lodash/isFunction';
import {
  emptyArr,
  emptyObj,
  emptyNullFunc,
  ACCEPT,
  BUTTON,
  CHARACTER,
  DECLINE,
  ELEMENT,
  HOUR,
  MY_TITANS,
  NEW,
  REQUESTS,
  TERTIARY,
} from 'defaults';
import { executePrimusRequest } from 'client/request';
import { withSub } from 'client/lib/sub';
import { getCharacter } from 'reducers/character/selectors';
import RequestsItemUser from './RequestsItemUser';
import styles from './css/request.css';

class RequestsItem extends Component {
  static displayName = 'RequestsItem'

  static propTypes = {
    character: PropTypes.object,
    request: PropTypes.object,
    incoming: PropTypes.bool,
    addSuccess: PropTypes.func,
    t: PropTypes.func,
  }

  static defaultProps = {
    character: emptyObj,
    request: emptyObj,
    t: emptyNullFunc,
  }

  constructor(props) {
    super(props);

    this.prepare();
  }

  componentWillReceiveProps(newProps) {
    this.prepare(newProps);
  }

  prepare(props = this.props) {
    const { now, request } = props;

    const { accepted, declined, requestedAt } = request;

    this.isNew = now && !accepted && !declined && now.diff(requestedAt, HOUR) < 24;
  }

  accept = () => {
    const { request } = this.props;

    const { _id, characterId } = request;

    executePrimusRequest(ACCEPT, CHARACTER, { characterId, requestId: _id }, this.cb);
  }

  decline = () => {
    const { request } = this.props;

    const { _id, characterId } = request;

    executePrimusRequest(DECLINE, CHARACTER, { characterId, requestId: _id }, this.cb);
  }

  cb = (err) => {
    if (err) {
      return;
    }

    const { addSuccess } = this.props;

    if (isFunction(addSuccess)) {
      addSuccess();
    }
  }

  render() {
    const { character, request, incoming, t } = this.props;

    const { _id, element, image, level, name, v } = character;

    if (!_id) {
      return null;
    }

    const { isNew } = this;

    const { accepted, declined, owner, taker } = request;

    const finished = accepted || declined;

    const state = {
      prevPath: '/rent-titan/requests',
      backButtonTitle: t([REQUESTS]),
      incoming,
      taker,
    };

    return (
      <div className={styles.request} data-id={request._id}>

        {isNew && (
          <div className={styles.new}>
            {t([NEW])}
          </div>
        )}

        <Link className={styles.character} to={{ pathname: `/rent-titan/${_id}`, state }}>

          <div
            className={styles.img}
            style={{
              backgroundImage: `url('${image || `/api/charImage/${_id}/${_id}.png?v=${v}`}')`,
            }}
          />

          <div className={styles.info}>

            {element && (
              <img
                height={40}
                src={`/img/characterElements/${element}.svg`}
                alt={ELEMENT}
              />
            )}

            <div className={styles.lvl}>
              LVL {level}
            </div>

          </div>

          <div className={styles.name}>
            {name}
          </div>

        </Link>

        <RequestsItemUser
          character={character}
          request={request}
          userId={incoming ? taker : owner}
          incoming={incoming}
          t={t}
        />

        <div className={styles.btns}>
          {incoming ? (
            !finished && (
              <>

                <button
                  type={BUTTON}
                  className={cx(TERTIARY, styles.incoming)}
                  onClick={this.accept}
                >
                  {t([ACCEPT])}
                </button>

                <button
                  type={BUTTON}
                  className={cx(TERTIARY, styles.incoming)}
                  onClick={this.decline}
                >
                  {t([DECLINE])}
                </button>

              </>
            )
          ) : (
            <Link to={'/rent-titan/titans'}>
              <button type={BUTTON} className={TERTIARY}>
                {t([MY_TITANS])}
              </button>
            </Link>
          )}
        </div>

      </div>
    );
  }
}

export default withSub(RequestsItem, function requestWithSub({ characterId }) {
  if (characterId) {
    return [{
      name: CHARACTER,
      props: {
        characterId,
      },
    }];
  }

  return emptyArr;
}, function mapStateToProps(state, { characterId }) {
  return {
    character: getCharacter(state, characterId),
  };
});
