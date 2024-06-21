import { BorshAccountsCoder, utils } from '@coral-xyz/anchor';
import {
  PublicKey,
  TransactionMessage,
  VersionedTransaction,
  sendAndConfirmRawTransaction,
} from '@solana/web3.js';

/** Address of the SPL Associated Token Account program */
export const ASSOCIATED_TOKEN_PROGRAM_ID = new PublicKey('ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL');

export const METADATA_PROGRAM_ID = new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s');

export const TOKEN_PROGRAM_ID = new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA');

/**
* Get the address of the associated token account for a given mint and owner
*
* @param mint                     Token mint account
* @param owner                    Owner of the new account
* @param allowOwnerOffCurve       Allow the owner account to be a PDA (Program Derived Address)
* @param programId                SPL Token program account
* @param associatedTokenProgramId SPL Associated Token program account
*
* @return Address of the associated token account
*/
export function getAssociatedTokenAddressSync(
  mint,
  owner,
  allowOwnerOffCurve = false,
  programId = TOKEN_PROGRAM_ID,
  associatedTokenProgramId = ASSOCIATED_TOKEN_PROGRAM_ID,
) {
  if (!allowOwnerOffCurve && !PublicKey.isOnCurve(owner.toBuffer())) {
    throw 'TokenOwnerOffCurveError';
  }

  const [address] = PublicKey.findProgramAddressSync(
    [owner.toBuffer(), programId.toBuffer(), mint.toBuffer()],
    associatedTokenProgramId,
  );

  return address;
}

export function findMintMetadataId(mintId) {
  return PublicKey.findProgramAddressSync(
    [
      utils.bytes.utf8.encode('metadata'),
      METADATA_PROGRAM_ID.toBuffer(),
      mintId.toBuffer(),
    ],
    METADATA_PROGRAM_ID,
  )[0];
}

/**
* Fecthes multiple accounts in batches since there is a limit of
* 100 accounts per connection.getMultipleAccountsInfo call
* @param connection
* @param ids
* @param config
* @param batchSize
* @returns
*/
export async function getBatchedMultipleAccounts(
  connection,
  ids,
  config,
  batchSize = 100,
) {
  const batches = [[]];
  ids.forEach((id) => {
    const batch = batches[batches.length - 1];
    if (batch) {
      if (batch.length >= batchSize) {
        batches.push([id]);
      } else {
        batch.push(id);
      }
    }
  });
  const batchAccounts = await Promise.all(
    batches.map((b) => b.length > 0 ? connection.getMultipleAccountsInfo(b, config) : []),
  );
  return batchAccounts.flat();
}

/**
* Decode an idl account of unknown type
* @param accountInfo
* @param idl
* @returns
*/
export function decodeIdlAccountUnknown(accountInfo, idl) {
  if (!accountInfo) throw 'No account found';
  // get idl accounts
  const idlAccounts = idl.accounts;
  if (!idlAccounts) throw 'No account definitions found in IDL';
  // find matching account name
  const accountTypes = idlAccounts.map((a) => a.name);
  const accountType = accountTypes?.find(
    (type) => BorshAccountsCoder.accountDiscriminator(type).compare(
      accountInfo.data.subarray(0, 8),
    ) === 0,
  );
  if (!accountType) throw 'No account discriminator match found';

  // decode
  const parsed = new BorshAccountsCoder(idl).decode(
    accountType,
    accountInfo.data,
  );
  return {
    ...accountInfo,
    type: accountType,
    parsed,
  };
}

/**
* Try to decode an account with idl types of unknown type
* @param accountInfo
* @param idl
* @returns
*/
export function tryDecodeIdlAccountUnknown(accountInfo, idl) {
  try {
    return decodeIdlAccountUnknown(accountInfo, idl);
  } catch (e) {
    return {
      ...accountInfo,
      type: 'unknown',
      parsed: null,
    };
  }
}

/**
* Decode account infos with corresponding ids
* @param accountIds
* @param accountInfos
* @returns
*/
export function decodeIdlAccountInfos(
  accountIds,
  accountInfos,
  programId,
  idl,
) {
  return accountInfos.reduce((acc, accountInfo, i) => {
    if (!accountInfo?.data) return acc;
    const accountId = accountIds[i];
    if (!accountId) return acc;
    const accoutIdString = accountId?.toString() ?? '';
    const ownerString = accountInfo.owner.toString();
    const baseData = {
      timestamp: Date.now(),
      pubkey: accountId,
    };
    switch (ownerString) {
      // stakePool
      case programId?.toString(): {
        acc[accoutIdString] = {
          ...baseData,
          ...tryDecodeIdlAccountUnknown(accountInfo, idl),
        };
        return acc;
      }
      // fallback
      default:
        acc[accoutIdString] = {
          ...baseData,
          ...accountInfo,
          type: 'unknown',
          parsed: null,
        };
        return acc;
    }
  }, {});
}

export async function fetchIdlAccountDataById(
  connection,
  ids,
  programId,
  idl,
) {
  const filteredIds = ids.filter((id) => id !== null);

  const accountInfos = await getBatchedMultipleAccounts(connection, filteredIds);

  return decodeIdlAccountInfos(filteredIds, accountInfos, programId, idl);
}

export function tryPublicKey(publicKeyString) {
  if (!publicKeyString) return null;
  try {
    return new PublicKey(publicKeyString);
  } catch (e) {
    return null;
  }
}

/**
* An utility for creating a wallet interface given a publicKey. This can be used when a wallet parameter is required but it will not need to sign
* @param publicKey
* @returns A wallet interface with empty sign methods
*/
export function emptyWallet(publicKey) {
  return {
    publicKey,
    signTransaction: async (tx) => new Promise(() => tx),
    signAllTransactions: async (txs) => new Promise(() => txs),
  };
}

export async function executeTransaction(connection, tx, wallet, config) {
  const blockhash = (await connection.getLatestBlockhash()).blockhash;
  const lookupTableAccounts = config?.lookupTableIds
    ? (
      await Promise.all(
        config?.lookupTableIds?.map((lookupTableId) => connection.getAddressLookupTable(lookupTableId)) ?? [],
      )
    )
      .map((lut) => lut.value)
      .filter((x) => x !== null)
    : [];

  const messageV0 = new TransactionMessage({
    payerKey: wallet.publicKey,
    recentBlockhash: blockhash,
    instructions: tx.instructions,
  }).compileToV0Message(lookupTableAccounts);
  let transactionV0 = new VersionedTransaction(messageV0);
  transactionV0 = await wallet.signTransaction(transactionV0);
  if (config?.signers) {
    transactionV0.sign(config?.signers ?? []);
  }
  try {
    const txid = await sendAndConfirmRawTransaction(
      connection,
      Buffer.from(transactionV0.serialize()),
      config?.confirmOptions,
    );
    return txid;
  } catch (err) {
    if (!config?.silent) {
      console.log(err); // eslint-disable-line
    }
    throw err;
  }
}

// The lines below are needed for rental hooks to not throw an error when trying to decode data in nftRentalsProgram
// Extend buffer prototype with readUIntLE, why not!

/*
* Need to make sure that buffer isn't trying to write out of bounds.
*/
function checkOffset(offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint');
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length');
}

// eslint-disable-next-line no-extend-native
Uint8Array.prototype.readUIntLE = function readUIntLE(offset, byteLength, noAssert) {
  offset >>>= 0; // eslint-disable-line no-param-reassign
  byteLength >>>= 0; // eslint-disable-line no-param-reassign
  if (!noAssert) checkOffset(offset, byteLength, this.length);

  let val = this[offset];
  let mul = 1;
  let i = 0;
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul;
  }

  return val;
};
