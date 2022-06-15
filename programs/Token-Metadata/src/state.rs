/// states for Auction House
use anchor_lang::{prelude::*, AnchorDeserialize, AnchorSerialize};



/// NOTE: Metadata struct holding NFT's extra information 
#[account]
pub struct Metadata {
    /// The name of the asset
    pub name: String,

    /// The symbol of the asset
    pub symbol: String,

    /// URI pointing to off-chain storage of the asset (containing JSON representing the asset)
    pub uri: String,

    /// Royalty basis points that goes to creators after the secondary sales
    /// FIXME: the name and limit of this variable can/ should be changed in the future
    pub share_basis_point: u32,

    pub creators: Option<Vec<Creator>>,
}

/// NOTE: Creator struct holding creator's information

#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Debug)]
pub struct Creator {
    /// creator's address
    pub address: Pubkey,

    /// a boolean used to specify whether the creator is verified or not.
    /// NOTE: Personally think that is should be used with `friend` system. 
    pub verified: bool,

    /// The share that the creator get after the sale.
    pub share: u8,
}
