import * as anchor from "@project-serum/anchor";
import {
  CreateEsTokenMetadataAccountArgs,
  CreateEsTokenMetadataArgs,
} from "./interfaces";

export const createEsTokenMetadataAccount = async (
  args: CreateEsTokenMetadataArgs
) => {
  const {
    metadataKey,
    mintKey,
    mintAuthorityKey,
    payerKey,
    updateAuthorityKey,
    esTokenMetadataProgram,
    metadata,
    walletKeyPair,
  } = args;

  const _metadata = metadata as any;

  const accounts: any = {
    metadata: metadataKey,
    mint: mintKey,
    mintAuthority: mintAuthorityKey,
    payer: payerKey,
    updateAuthority: updateAuthorityKey,
    systemProgram: anchor.web3.SystemProgram.programId,
    rent: anchor.web3.SYSVAR_RENT_PUBKEY,
  };

  console.log(
    "[createEsTokenMetadataAccount] accounts => ",
    accounts.mint.toBase58()
  );

  console.log("[createEsTokenMetadataAccount] _metadata => ", _metadata);
  console.log(_metadata);

  const tx = await esTokenMetadataProgram.methods
    .createMetadataAccount(_metadata)
    .accounts(accounts)
    .signers([walletKeyPair, walletKeyPair])
    .rpc();

  console.log("[createEsTokenMetadataAccount] tx => ", tx);
};
