import { getBalance } from 'server/lib/balance';

export default {
  async activeBalance() {
    const balance = await getBalance();

    return {
      balance,
    };
  },

  async balance(props) {
    const { version } = props;

    const balance = await getBalance(version);

    return {
      balance,
    };
  },
};
