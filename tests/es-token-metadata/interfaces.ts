import * as anchor from "@project-serum/anchor";

export type CreateEsTokenMetadataArgs = {
  metadataKey: anchor.web3.PublicKey;
  mintKey: anchor.web3.PublicKey;
  mintAuthorityKey: anchor.web3.PublicKey;
  payerKey: anchor.web3.PublicKey;
  updateAuthorityKey: anchor.web3.PublicKey;
  esTokenMetadataProgram: anchor.Program;
  metadata: Metadata;
  walletKeyPair: anchor.web3.Keypair;
};

export type CreateEsTokenMetadataAccountArgs = {
  metadataKey: anchor.web3.PublicKey;
  mintKey: anchor.web3.PublicKey;
  mintAuthorityKey: anchor.web3.PublicKey;
  payerKey: anchor.web3.PublicKey;
  updateAuthorityKey: anchor.web3.PublicKey;
  systemProgram: anchor.web3.PublicKey;
  rent: anchor.web3.PublicKey;
};

export type Creator = {
  address: anchor.web3.PublicKey;
  verified: boolean;
  share: number;
};

export type Metadata = {
  name: string;
  symbol: string;
  uri: string;
  shareBasisPoint: number;
  creators: Creator[];
};
