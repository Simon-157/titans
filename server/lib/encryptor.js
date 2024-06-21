import simpleEncryptor from 'simple-encryptor';

const {
  ENCRYPTOR_KEY = '1234567890123456',
} = process.env;

export default simpleEncryptor(ENCRYPTOR_KEY);
