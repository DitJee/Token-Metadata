

#[allow(dead_code)]
use anchor_lang::{prelude::*, solana_program::program::invoke, AnchorDeserialize};
use anchor_spl::token::{Token, TokenAccount};
use solana_program::program_memory::sol_memset;
use spl_token::instruction::approve;

use crate::constants::*;
use crate::state::*;

#[derive(Accounts)]
#[instruction()]
pub struct CreateMetadataAccount <'info> {

    /// Metadata account holding NFT's extra information
    #[account(
        init,
        seeds = [
            PREFIX.as_bytes(),
            crate::id().as_ref(),
            mint.key().as_ref()
        ],
        bump,
        payer = payer,
        space = MAX_META_DATA_SIZE
    )]
    pub metadata: Account<'info, Metadata>,

    /// CHECK: Not dangerous. Validate in assert_key_equal
    /// Mint address of the NFT
    pub mint: UncheckedAccount<'info>,

    /// Mint authority
    pub mint_authority : Signer<'info>,

    /// payer's wallet
    #[account(mut)]
    pub payer: Signer<'info>,

    /// CHECK: Not dangerous. Check if is_signer is true
    /// Update authority
    pub update_authority: UncheckedAccount<'info>,

    pub system_program: Program<'info, System>,

    pub rent: Sysvar<'info, Rent>,
}

pub fn create_metadata_account<'info> (
    ctx: Context<'_, '_, '_, 'info, CreateMetadataAccount<'info>>,
    metadata: Metadata
    // TODO: add args
) -> Result<()> {

    // TODO: validate input args and ctx
    create_metadata_account_logic(ctx, metadata)
}

pub fn create_metadata_account_logic <'info>(
    ctx: Context<'_, '_, '_, 'info, CreateMetadataAccount<'info>>,
    metadata: Metadata
) -> Result<()>{

    let _metadata = &mut ctx.accounts.metadata;

    _metadata.name = metadata.name;
    _metadata.symbol = metadata.symbol;
    _metadata.uri = metadata.uri;
    _metadata.share_basis_point = metadata.share_basis_point;
    _metadata.creators = metadata.creators;

    Ok(())
}