import * as anchor from "@project-serum/anchor";
import { ES_TOKEN_METADATA_PROGRAM } from "./constants";

export const loadTokenMetadataProgram = async (
  walletKeyPair: anchor.web3.Keypair,
  env: string,
  customRpcUrl?: string
): Promise<anchor.Program> => {
  if (customRpcUrl)
    console.log("[loadTokenMetadataProgram] USING CUSTOM URL", customRpcUrl);

  const walletWrapper = new anchor.Wallet(walletKeyPair);

  //FIXME: Need to link `env` to connection creation
  console.log("[loadTokenMetadataProgram] deployment env => ", env);

  const connection = new anchor.web3.Connection(
    anchor.web3.clusterApiUrl(env as anchor.web3.Cluster),
    "confirmed"
  );
  const provider = new anchor.AnchorProvider(connection, walletWrapper, {
    preflightCommitment: "confirmed",
  });

  console.log(
    "[loadTokenMetadataProgram] fetching IDL using program ID => ",
    ES_TOKEN_METADATA_PROGRAM
  );
  const idl = await anchor.Program.fetchIdl(
    ES_TOKEN_METADATA_PROGRAM,
    provider
  );

  console.log("[loadTokenMetadataProgram] idl => ", idl);

  return new anchor.Program(idl, ES_TOKEN_METADATA_PROGRAM, provider);
};

export const addSOLToWallet = async (wallet: anchor.web3.Keypair) => {
  try {
    const network = anchor.web3.clusterApiUrl("devnet");

    const connection = new anchor.web3.Connection(network);
    const airdropSignature = await connection.requestAirdrop(
      wallet.publicKey,
      2 * anchor.web3.LAMPORTS_PER_SOL // 10000000 Lamports in 1 SOL
    );

    const latestBlockHash = await connection.getLatestBlockhash();

    await connection.confirmTransaction({
      blockhash: latestBlockHash.blockhash,
      lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
      signature: airdropSignature,
    });
  } catch (error) {
    console.error(error);
  }
};
