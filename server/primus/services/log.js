import { STRING } from 'defaults';
import { writeLog } from '../log';
import { validate } from '../validate';

export default {
  async write({ data, spark }) {
    validate(data, {
      message: STRING,
      stack: STRING,
      type: STRING,
    });

    await writeLog(spark, data);
  },
};
