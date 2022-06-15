import { Creator, Metadata } from "./es-token-metadata/interfaces";
import * as anchor from "@project-serum/anchor";

export const getTestMetadata = (
  creatorKey: anchor.web3.PublicKey
): Metadata => {
  const name = "jee";
  const symbol = "jeeSymbol";
  const uri =
    "https://arweave.net//GMA_VrGkyL_xpAEtX5a7w7kbaakrh3q0pCu1covMycM";
  const shareBasisPoint = 10;
  const creators: Creator[] = [
    {
      address: creatorKey,
      verified: false,
      share: 50,
    },
    {
      address: new anchor.web3.PublicKey(
        "ESz5bto4fkF68grek4cAhsfn7r9XBnG85RLZLkJRAzbE"
      ),
      verified: false,
      share: 50,
    },
  ];

  const metadata: Metadata = {
    creators,
    name,
    shareBasisPoint,
    symbol,
    uri,
  };

  return metadata;
};
