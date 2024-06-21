import get from 'lodash/get';
import { DATA, ERROR } from 'defaults';
import { writeLog } from './log';
import { withToken } from './withToken';
import generateRes from './res';
import services from './services';

export const opened = {};

export default function initPrimus(primus) {
  primus.on('connection', async function primusOnConnection(spark) {
    const { id } = spark;

    spark.on(DATA, async function sparkOnData(data = '') {
      let msg;
      try {
        msg = JSON.parse(data);
      } catch (err) {
        msg = data;
      }

      const res = generateRes(spark, msg.id);

      if (!opened[id]) {
        await withToken(spark, res);

        if (!opened[id]) {
          opened[id] = true;
        }
      }

      const serviceName = get(msg.data, [1]);

      const service = services[serviceName];

      if (!service) {
        res.status(404).send(`404 - Service "${serviceName}" Not Found`);

        return;
      }

      const actionName = get(msg.data, [0]);

      const action = service[actionName];

      if (!action) {
        res.status(404).send(`404 - Action "${actionName}" Not Found For Service "${serviceName}"`);

        return;
      }

      try {
        await action({
          data: get(msg.data, [2]),
          primus,
          res,
          spark,
        });
      } catch (err) {
        let status = err.status || parseInt(err, 10);

        if (isNaN(status)) {
          status = 500;
        }

        if (status >= 500) {
          const { stack } = err;

          writeLog(spark, {
            message: err,
            pathname: `${actionName}/${serviceName}`,
            server: true,
            stack,
            type: ERROR,
          });
        }

        res.status(500).send(err);
      }
    });
  });

  primus.on('disconnection', function primusOnDisconnection(spark) {
    const { id } = spark;

    spark.leaveAll();

    delete opened[id];
  });
}
