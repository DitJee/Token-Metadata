import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { TokenMetadata } from "../target/types/token_metadata";

describe("Token-Metadata", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.TokenMetadata as Program<TokenMetadata>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });
});
