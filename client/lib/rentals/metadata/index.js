import { PublicKey } from '@solana/web3.js';
import * as beet from '@metaplex-foundation/beet';
import * as beetSolana from '@metaplex-foundation/beet-solana';
import { Key, keyBeet } from './Key';
import { dataBeet } from './Data';
import { tokenStandardBeet } from './TokenStandard';
import { collectionBeet } from './Collection';
import { usesBeet } from './Uses';
import { collectionDetailsBeet } from './CollectionDetails';
import { programmableConfigBeet } from './ProgrammableConfig';

/**
 * Holds the data for the {@link Metadata} Account and provides de/serialization
 * functionality for that data
 *
 * @category Accounts
 * @category generated
 */
export class Metadata {
  constructor(
    key,
    updateAuthority,
    mint,
    data,
    primarySaleHappened,
    isMutable,
    editionNonce,
    tokenStandard,
    collection,
    uses,
    collectionDetails,
    programmableConfig,
  ) {
    this.key = key;
    this.updateAuthority = updateAuthority;
    this.mint = mint;
    this.data = data;
    this.primarySaleHappened = primarySaleHappened;
    this.isMutable = isMutable;
    this.editionNonce = editionNonce;
    this.tokenStandard = tokenStandard;
    this.collection = collection;
    this.uses = uses;
    this.collectionDetails = collectionDetails;
    this.programmableConfig = programmableConfig;
  }

  /**
   * Creates a {@link Metadata} instance from the provided args.
   */
  static fromArgs(args) {
    return new Metadata(
      args.key,
      args.updateAuthority,
      args.mint,
      args.data,
      args.primarySaleHappened,
      args.isMutable,
      args.editionNonce,
      args.tokenStandard,
      args.collection,
      args.uses,
      args.collectionDetails,
      args.programmableConfig,
    );
  }

  /**
   * Deserializes the {@link Metadata} from the data of the provided {@link web3.AccountInfo}.
   * @returns a tuple of the account data and the offset up to which the buffer was read to obtain it.
   */
  static fromAccountInfo(accountInfo, offset = 0) {
    return Metadata.deserialize(accountInfo.data, offset);
  }

  /**
   * Retrieves the account info from the provided address and deserializes
   * the {@link Metadata} from its data.
   *
   * @throws Error if no account info is found at the address or if deserialization fails
   */
  static async fromAccountAddress(connection, address, commitmentOrConfig) {
    const accountInfo = await connection.getAccountInfo(
      address,
      commitmentOrConfig,
    );
    if (accountInfo == null) {
      throw new Error(`Unable to find Metadata account at ${address}`);
    }
    return Metadata.fromAccountInfo(accountInfo, 0)[0];
  }

  /**
   * Provides a {@link web3.Connection.getProgramAccounts} config builder,
   * to fetch accounts matching filters that can be specified via that builder.
   *
   * @param programId - the program that owns the accounts we are filtering
   */
  static gpaBuilder(
    programId = new PublicKey(
      'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s',
    ),
  ) {
    // eslint-disable-next-line no-use-before-define
    return beetSolana.GpaBuilder.fromStruct(programId, metadataBeet);
  }

  /**
   * Deserializes the {@link Metadata} from the provided data Buffer.
   * @returns a tuple of the account data and the offset up to which the buffer was read to obtain it.
   */
  static deserialize(buf, offset = 0) {
    // eslint-disable-next-line no-use-before-define
    return deserialize(buf, offset);
  }

  /**
  * Serializes the {@link Metadata} into a Buffer.
  * @returns a tuple of the created Buffer and the offset up to which the buffer was written to store it.
  */
  serialize() {
    return 'Not Implemented';
  }

  /**
   * Returns the byteSize of a {@link Buffer} holding the serialized data of
   * {@link Metadata} for the provided args.
   *
   * @param args need to be provided since the byte size for this account
   * depends on them
   */
  static byteSize(args) {
    const instance = Metadata.fromArgs(args);

    // eslint-disable-next-line no-use-before-define
    return metadataBeet.toFixedFromValue(instance).byteSize;
  }

  /**
   * Fetches the minimum balance needed to exempt an account holding
   * {@link Metadata} data from rent
   *
   * @param args need to be provided since the byte size for this account
   * depends on them
   * @param connection used to retrieve the rent exemption information
   */
  static async getMinimumBalanceForRentExemption(args, connection, commitment) {
    return connection.getMinimumBalanceForRentExemption(
      Metadata.byteSize(args),
      commitment,
    );
  }

  /**
   * Returns a readable version of {@link Metadata} properties
   * and can be used to convert to JSON and/or logging
   */
  pretty() {
    return {
      key: `Key.${Key[this.key]}`,
      updateAuthority: this.updateAuthority.toBase58(),
      mint: this.mint.toBase58(),
      data: this.data,
      primarySaleHappened: this.primarySaleHappened,
      isMutable: this.isMutable,
      editionNonce: this.editionNonce,
      tokenStandard: this.tokenStandard,
      collection: this.collection,
      uses: this.uses,
      collectionDetails: this.collectionDetails,
      programmableConfig: this.programmableConfig,
    };
  }
}

/**
 * @category Accounts
 * @category generated
 */
export const metadataBeet = new beet.FixableBeetStruct(
  [
    ['key', keyBeet],
    ['updateAuthority', beetSolana.publicKey],
    ['mint', beetSolana.publicKey],
    ['data', dataBeet],
    ['primarySaleHappened', beet.bool],
    ['isMutable', beet.bool],
    ['editionNonce', beet.coption(beet.u8)],
    ['tokenStandard', beet.coption(tokenStandardBeet)],
    ['collection', beet.coption(collectionBeet)],
    ['uses', beet.coption(usesBeet)],
    ['collectionDetails', beet.coption(collectionDetailsBeet)],
    ['programmableConfig', beet.coption(programmableConfigBeet)],
  ],
  Metadata.fromArgs,
  'Metadata',
);

const NONE_BYTE_SIZE = beet.coptionNone('').byteSize;

function tryReadOption(optionBeet, buf, offset) {
  try {
    const fixed = optionBeet.toFixedFromData(buf, offset);
    const value = fixed.read(buf, offset);
    return [value, fixed.byteSize, false];
  } catch (e) {
    return [null, NONE_BYTE_SIZE, true];
  }
}

/**
 * This is a custom deserializer for TokenMetadata in order to mitigate acounts with corrupted
 * data on chain.
 *
 * Instead of failing the deserialization for the section that is possibly corrupt it just returns
 * `null` for the fields that would normally be stored in that section.
 *
 * This deserializer matches the [fix implemented in the Rust program](https://github.com/metaplex-foundation/metaplex-program-library/blob/df36da5a78fb17e1690247b8041b761d27c83b1b/token-metadata/program/src/deser.rs#L6).
 * Also @see ../../../program/src/deser.rs
 */
export function deserialize(buf, offset = 0) {
  let cursor = offset;

  // key
  const key = keyBeet.read(buf, cursor);
  cursor += keyBeet.byteSize;

  // updateAuthority
  const updateAuthority = beetSolana.publicKey.read(buf, cursor);
  cursor += beetSolana.publicKey.byteSize;

  // mint
  const mint = beetSolana.publicKey.read(buf, cursor);
  cursor += beetSolana.publicKey.byteSize;

  // data
  const [data, dataDelta] = dataBeet.deserialize(buf, cursor);
  cursor = dataDelta;

  // primarySaleHappened
  const primarySaleHappened = beet.bool.read(buf, cursor);
  cursor += beet.bool.byteSize;

  // isMutable
  const isMutable = beet.bool.read(buf, cursor);
  cursor += beet.bool.byteSize;

  // editionNonce
  const editionNonceBeet = beet.coption(beet.u8).toFixedFromData(buf, cursor);
  const editionNonce = editionNonceBeet.read(buf, cursor);
  cursor += editionNonceBeet.byteSize;

  // -----------------
  // Possibly corrupted section
  // -----------------

  // NOTE: that we avoid trying to deserialize any subsequent fields if a
  // previous one was found to be corrupted just to save work

  // tokenStandard
  const [tokenStandard, tokenDelta, tokenCorrupted] = tryReadOption(
    beet.coption(tokenStandardBeet),
    buf,
    cursor,
  );
  cursor += tokenDelta;

  // collection
  const [collection, collectionDelta, collectionCorrupted] = tokenCorrupted
    ? [null, NONE_BYTE_SIZE, true]
    : tryReadOption(beet.coption(collectionBeet), buf, cursor);
  cursor += collectionDelta;

  // uses
  const [uses, usesDelta, usesCorrupted] =
    tokenCorrupted || collectionCorrupted
      ? [null, NONE_BYTE_SIZE, true]
      : tryReadOption(beet.coption(usesBeet), buf, cursor);
  cursor += usesDelta;

  // collection_details
  const [
    collectionDetails,
    collectionDetailsDelta,
    collectionDetailsCorrupted,
  ] =
    tokenCorrupted || collectionCorrupted || usesCorrupted
      ? [null, NONE_BYTE_SIZE, true]
      : tryReadOption(beet.coption(collectionDetailsBeet), buf, cursor);
  cursor += collectionDetailsDelta;

  // programmable_config
  const [
    programmableConfig,
    programmableConfigDelta,
    programmableConfigCorrupted,
  ] =
    tokenCorrupted || collectionCorrupted || usesCorrupted
      ? [null, NONE_BYTE_SIZE, true]
      : tryReadOption(beet.coption(programmableConfigBeet), buf, cursor);
  cursor += programmableConfigDelta;

  const anyCorrupted =
    tokenCorrupted ||
    collectionCorrupted ||
    usesCorrupted ||
    collectionDetailsCorrupted ||
    programmableConfigCorrupted;

  const args = {
    key,
    updateAuthority,
    mint,
    data,
    primarySaleHappened,
    isMutable,
    editionNonce,
    tokenStandard: anyCorrupted ? null : tokenStandard,
    collection: anyCorrupted ? null : collection,
    uses: anyCorrupted ? null : uses,
    collectionDetails: anyCorrupted ? null : collectionDetails,
    programmableConfig: anyCorrupted ? null : programmableConfig,
  };

  return [Metadata.fromArgs(args), cursor];
}
