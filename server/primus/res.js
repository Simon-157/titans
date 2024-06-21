import { handleError } from 'lib/error';

export default function generateRes(spark, id) {
  return {
    send: (msg) => {
      spark.write({
        type: 1,
        data: [null, msg],
        id,
      });
    },
    status: (code) => {
      const isError = code >= 400;

      return {
        send: (msg) => {
          spark.write({
            type: 1,
            data: [isError ? handleError(msg) : null, isError ? null : msg],
            id,
          });
        },
      };
    },
  };
}
