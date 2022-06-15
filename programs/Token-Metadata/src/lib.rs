use anchor_lang::prelude::*;

pub mod create_metadata_account;
pub mod state;
pub mod constants;
pub mod mint_nft;

use crate::create_metadata_account::*;
use crate::state::*;
use crate::mint_nft::*;

declare_id!("DTdBgGUYz2Lov3W418Zz4XgKiM7nLGh1EFXJAk4T4epS");

#[allow(unused)]
#[program]
pub mod token_metadata {
    use super::*;

    pub fn mint_nft <'info> (ctx: Context<'_, '_,'_,'info,MintNft<'info>>) -> Result<()> {
        mint_nft::mint_nft(ctx)
    }

    pub fn create_metadata_account <'info> (
        ctx: Context<'_, '_, '_, 'info, CreateMetadataAccount<'info>>,
        metadata: Metadata
    ) -> Result<()> {
        msg!("Instruction: Create Metadata Accounts");
        create_metadata_account::create_metadata_account(ctx, metadata)


    }
}

