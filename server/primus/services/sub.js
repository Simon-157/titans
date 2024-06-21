import { stringify } from 'qs';
import set from 'lodash/set';
import { STRING } from 'defaults';
import { sort } from 'lib/object';
import { getSub } from '../sub';
import permissions from '../sub/permissions';
import { validate } from '../validate';

export default {
  async init({ data, res, spark }) {
    validate(data, {
      name: STRING,
    });

    const { name, props, reactive = true } = data;

    const permissionsFunc = permissions[name];
    if (permissionsFunc) {
      const { user } = spark;

      if (!user) {
        res.status(401).send('401 Unauthorized');

        return;
      }

      if (!permissionsFunc({ props, user })) {
        res.status(403).send(`403 Forbidden - Sub ${name}`);

        return;
      }
    }

    const subName = `${name}?${stringify(sort(props))}`;

    set(data, 'subName', subName);

    if (reactive) {
      spark.join(subName);
    }

    const result = await getSub(data);

    res.send(result.data);
  },

  close({ data, spark }) {
    validate(data, {
      name: STRING,
    });

    const { name, props } = data;

    const subName = `${name}?${stringify(sort(props))}`;

    spark.leave(subName);
  },
};
