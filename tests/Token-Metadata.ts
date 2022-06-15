import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { TokenMetadata } from "../target/types/token_metadata";
import { getMetadata, mint } from "./account";
import { createEsTokenMetadataAccount } from "./es-token-metadata";
import {
  CreateEsTokenMetadataArgs,
  Metadata,
} from "./es-token-metadata/interfaces";
import { getTestMetadata } from "./misc";
import { addSOLToWallet, loadTokenMetadataProgram } from "./utils";

let walletKeyPair: anchor.web3.Keypair;
let tokenAccount: anchor.web3.PublicKey;
let esTokenMetadataProgram: anchor.Program;

describe("Token-Metadata", () => {
  const env = "devnet";
  before(async () => {
    try {
      walletKeyPair = anchor.web3.Keypair.generate();
      await addSOLToWallet(walletKeyPair);

      esTokenMetadataProgram = await loadTokenMetadataProgram(
        walletKeyPair,
        env
      );
    } catch (error) {
      console.error("[before] error while initializing => ", error);
    }
  });

  it("Is initialized!", async () => {
    console.log("-------------------------------------------");
    console.log("-------------------------------------------");
    console.log("hello hello");
    console.log("-------------------------------------------");
    console.log("-------------------------------------------");
  });

  it("should send the instruction to create metadata for the NFT", async () => {
    console.log("-------------------------------------------");
    console.log("-------------------------------------------");
    try {
      const { res, mintKeyPair } = await mint(
        esTokenMetadataProgram,
        walletKeyPair
      );

      const metadataKey = await getMetadata(mintKeyPair.publicKey);

      const metadata: any = getTestMetadata(walletKeyPair.publicKey) as any;

      await createEsTokenMetadataAccount({
        metadataKey: metadataKey,
        mintKey: mintKeyPair.publicKey,
        mintAuthorityKey: walletKeyPair.publicKey,
        payerKey: walletKeyPair.publicKey,
        updateAuthorityKey: walletKeyPair.publicKey,
        esTokenMetadataProgram: esTokenMetadataProgram,
        metadata,
        walletKeyPair: walletKeyPair,
      });
    } catch (error) {
      console.log("error in create metadata test => ", error.message);
      console.error("error in create metadata test => ", error);
    }

    console.log("-------------------------------------------");
    console.log("-------------------------------------------");
  });
});
