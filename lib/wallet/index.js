import bs58 from 'bs58';
import nacl from 'tweetnacl';
import { emptyStr } from 'defaults';

export class SignedMessage {
  constructor({ domain, nonce, publicKey, statement }) {
    this.domain = domain;
    this.nonce = nonce || emptyStr;
    this.publicKey = publicKey;
    this.statement = statement;
  }

  prepare() {
    return `${this.statement}${this.nonce}`;
  }

  async validate(signature) {
    const msg = this.prepare();
    const signatureUint8 = bs58.decode(signature);
    const msgUint8 = new TextEncoder().encode(msg);
    const pubKeyUint8 = bs58.decode(this.publicKey);

    return nacl.sign.detached.verify(msgUint8, signatureUint8, pubKeyUint8);
  }
}
