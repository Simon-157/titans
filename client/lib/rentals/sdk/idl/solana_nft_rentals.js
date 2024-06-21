export const IDL = {
  version: '0.1.0',
  name: 'nft_rentals',
  instructions: [
    {
      name: 'createRental',
      accounts: [
        {
          name: 'rental',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'rentalTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'mint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'mintMetadata',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'payer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'maker',
          isMut: false,
          isSigner: true,
        },
        {
          name: 'makerTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'metadataProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'associatedTokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'ix',
          type: {
            defined: 'CreateRentalIx',
          },
        },
      ],
    },
    {
      name: 'updateRental',
      accounts: [
        {
          name: 'rental',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'maker',
          isMut: true,
          isSigner: true,
        },
      ],
      args: [
        {
          name: 'ix',
          type: {
            defined: 'UpdateRentalIx',
          },
        },
      ],
    },
    {
      name: 'acceptRental',
      accounts: [
        {
          name: 'rental',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'rentalTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'mint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'mintEdition',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'mintMetadata',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'payer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'taker',
          isMut: false,
          isSigner: true,
        },
        {
          name: 'takerTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'metadataProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'associatedTokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'ix',
          type: {
            defined: 'AcceptRentalIx',
          },
        },
      ],
    },
    {
      name: 'closeRental',
      accounts: [
        {
          name: 'rental',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'rentalTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'mint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'maker',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'makerTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'metadataProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'associatedTokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: 'expireRental',
      accounts: [
        {
          name: 'rental',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'holdingTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'rentalTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'mint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'mintEdition',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'maker',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'makerTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'payer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'collector',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'metadataProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'associatedTokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
  ],
  accounts: [
    {
      name: 'rental',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'bump',
            type: 'u8',
          },
          {
            name: 'maker',
            type: 'publicKey',
          },
          {
            name: 'mint',
            type: 'publicKey',
          },
          {
            name: 'taker',
            type: {
              option: 'publicKey',
            },
          },
          {
            name: 'takerTokenAccount',
            type: {
              option: 'publicKey',
            },
          },
          {
            name: 'extensionPaymentMint',
            type: 'publicKey',
          },
          {
            name: 'extensionPaymentAmount',
            type: 'u64',
          },
          {
            name: 'extensionDurationSeconds',
            type: 'u64',
          },
          {
            name: 'expiration',
            type: {
              option: 'i64',
            },
          },
          {
            name: 'maxExpiration',
            type: 'i64',
          },
        ],
      },
    },
  ],
  types: [
    {
      name: 'AcceptRentalIx',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'extensionPaymentMint',
            type: 'publicKey',
          },
          {
            name: 'extensionPaymentAmount',
            type: 'u64',
          },
          {
            name: 'extensionDurationSeconds',
            type: 'u64',
          },
          {
            name: 'secondsToAdd',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'CreateRentalIx',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'mint',
            type: 'publicKey',
          },
          {
            name: 'extensionPaymentMint',
            type: 'publicKey',
          },
          {
            name: 'extensionPaymentAmount',
            type: 'u64',
          },
          {
            name: 'extensionDurationSeconds',
            type: 'u64',
          },
          {
            name: 'maxExpiration',
            type: 'i64',
          },
        ],
      },
    },
    {
      name: 'UpdateRentalIx',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'extensionPaymentMint',
            type: 'publicKey',
          },
          {
            name: 'extensionPaymentAmount',
            type: 'u64',
          },
          {
            name: 'extensionDurationSeconds',
            type: 'u64',
          },
          {
            name: 'maxExpiration',
            type: 'i64',
          },
        ],
      },
    },
    {
      name: 'PaymentShare',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'address',
            type: 'publicKey',
          },
          {
            name: 'basisPoints',
            type: 'u16',
          },
        ],
      },
    },
  ],
  errors: [
    {
      code: 6000,
      name: 'InvalidProgramId',
      msg: 'Invalid program id',
    },
    {
      code: 6001,
      name: 'InvalidRentalId',
      msg: 'Invalid rental id',
    },
    {
      code: 6002,
      name: 'InvalidMaker',
      msg: 'Invalid maker',
    },
    {
      code: 6003,
      name: 'CannotCloseActiveRental',
      msg: 'Cannot close active rental',
    },
    {
      code: 6004,
      name: 'CannotUpdateActiveRental',
      msg: 'Cannot update active rental',
    },
    {
      code: 6005,
      name: 'CannotAcceptActiveRental',
      msg: 'Cannot accept active rental',
    },
    {
      code: 6006,
      name: 'RentalHasChanged',
      msg: 'Rental has changed',
    },
    {
      code: 6007,
      name: 'InvalidMintMetadata',
      msg: 'Invalid mint metadata',
    },
    {
      code: 6008,
      name: 'MintNotAllowed',
      msg: 'Mint not allowed',
    },
    {
      code: 6009,
      name: 'InvalidRentalTokenAccount',
      msg: 'Invalid payer token account',
    },
    {
      code: 6010,
      name: 'InvalidAuthority',
      msg: 'Invalid payer token account',
    },
    {
      code: 6011,
      name: 'InvalidHoldingTokenAccount',
      msg: 'Invalid holding token account',
    },
    {
      code: 6012,
      name: 'RentalNotExpired',
      msg: 'Rental not expired',
    },
    {
      code: 6013,
      name: 'InvalidTransferProgram',
      msg: 'Invalid transfer program',
    },
    {
      code: 6014,
      name: 'InvalidPayerTokenAccount',
      msg: 'Invalid payer token account',
    },
    {
      code: 6015,
      name: 'InvalidPaymentTarget',
      msg: 'Invalid payment target',
    },
    {
      code: 6016,
      name: 'InvalidPaymentMint',
      msg: 'Invalid payment mint',
    },
  ],
};
