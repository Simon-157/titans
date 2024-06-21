import React, { Component } from 'react';
import { stringify } from 'qs';
import { connect } from 'react-redux';
import each from 'lodash/each';
import isArray from 'lodash/isArray';
import isEqual from 'lodash/isEqual';
import isFunction from 'lodash/isFunction';
import isUndefined from 'lodash/isUndefined';
import keys from 'lodash/keys';
import map from 'lodash/map';
import size from 'lodash/size';
import { emptyObj, CLOSE, INIT, SUB } from 'defaults';
import { randomId } from 'lib/random';
import { sort } from 'lib/object';
import { defaultSocket, executePrimusRequest, getSocket } from 'client/request';
import { reactiveSubs, subscriptions } from './sub';

export function withSub(
  Comp,
  data = emptyObj,
  mapStateToProps,
  mapDispatchToProps,
) {
  class Sub extends Component {
    static displayName = 'Sub'

    subs = {}

    constructor(props) {
      super(props);

      if (getSocket() === defaultSocket) {
        return;
      }

      let subs = isFunction(data) ? data(props) : data;
      subs = isArray(subs) ? subs : [subs];

      this.prevProps = subs;

      this.prepare(subs);
      this.state = {};
    }

    componentWillReceiveProps(newProps) {
      if (getSocket() === defaultSocket) {
        return;
      }

      let subs = isFunction(data) ? data(newProps) : data;
      subs = isArray(subs) ? subs : [subs];

      const equals = isEqual(this.prevProps, subs);

      if (!equals) {
        this.prevProps = subs;

        this.prepare(subs);
      }
    }

    prepare(subs) {
      let subsLength = subs.length;
      while (subsLength-- > 0) {
        const subscription = subs[subsLength];

        if (!subscription) {
          continue;
        }

        const { name, props: subProps } = subscription;

        const subName = `${name}?${stringify(sort(subProps))}`;

        if (isUndefined(subscription.reactive)) {
          subscription.reactive = true;
        }

        const { reactive } = subscription;

        if (reactive) {
          const id = randomId();

          // will be watching for changes for this sub id
          reactiveSubs[subName] = reactiveSubs[subName] || {};

          if (size(reactiveSubs[subName]) === 0) {
            executePrimusRequest(INIT, SUB, subscription, () => {
              if (this.unmounted) {
                return;
              }

              this.setState({
                [subName]: true,
              });
            });
          }

          reactiveSubs[subName][id] = true;
          this.subs[id] = {
            ...subscription,
            subName,
          };
        } else if (subscriptions[subName]) {
          continue;
        }

        subscriptions[subName] = true;

        if (!reactive) {
          executePrimusRequest(INIT, SUB, subscription, () => {
            if (this.unmounted) {
              return;
            }

            this.setState({
              [subName]: true,
            });
          });
        }
      }
    }

    componentWillUnmount() {
      this.unmounted = true;

      const { subs } = this;

      each(subs, (sub, id) => {
        const { reactive = true, subName, ...rest } = sub;

        if (!reactive) {
          return;
        }

        if (reactiveSubs[subName]) {
          // stop watching for changes for this sub id
          delete reactiveSubs[subName][id];
        }

        if (size(reactiveSubs[subName]) === 0) {
          // stop watching for changes for this sub name
          executePrimusRequest(CLOSE, SUB, rest);
        }
      });
    }

    render() {
      return (
        <Comp
          {...this.props}
          loadedSubs={this.state}
        />
      );
    }
  }

  if (isFunction(mapStateToProps) || mapDispatchToProps) {
    return connect(mapStateToProps, mapDispatchToProps)(Sub);
  }

  return Sub;
}

withSub.displayName = 'withSub';

Object.defineProperty(global, 'SubStore', {
  get() {
    return {
      // currently active reactive subs count:
      reactiveSubs: map(reactiveSubs, (data, key) => {
        return {
          [key]: size(data),
        };
      }),
      // all the subs that were called since last reload, including non-reactive:
      subscriptions: keys(subscriptions),
    };
  },
});
