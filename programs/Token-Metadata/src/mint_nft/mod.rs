use anchor_lang::{prelude::*, solana_program::program::invoke, AnchorDeserialize};
use anchor_spl::token::Token;
use anchor_spl::token;
use anchor_spl::token::MintTo;

#[derive(Accounts)]
pub struct MintNft<'info> {

    /// CHECK: This is not dangerous because we don't read or write from this account
    #[account(mut)]
    pub mint: UncheckedAccount<'info>,

    pub token_program: Program<'info, Token>,
    
    /// CHECK: This is not dangerous because we don't read or write from this account
    #[account(mut)]
    pub token_account: UncheckedAccount<'info>,

    /// CHECK: This is not dangerous because we don't read or write from this account
    #[account(mut)]
    pub payer: UncheckedAccount<'info>,
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}

pub fn mint_nft <'info> (ctx : Context<'_,'_,'_,'info, MintNft<'info>>) -> Result<()> {
    mint_nft_logic(ctx)
}

pub fn mint_nft_logic<'info> (ctx : Context<'_,'_,'_,'info, MintNft<'info>>) -> Result<()> {

    msg!("Initializing Mint Ticket");
    let cpi_accounts = MintTo {
        mint: ctx.accounts.mint.to_account_info(),
        to: ctx.accounts.token_account.to_account_info(),
        authority: ctx.accounts.payer.to_account_info(),
    };
    msg!("CPI Accounts Assigned");
    let cpi_program = ctx.accounts.token_program.to_account_info();
    msg!("CPI Program Assigned");
    let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
    msg!("CPI Context Assigned");
    token::mint_to(cpi_ctx, 1)?;
    msg!("Token Minted !!!");

    Ok(())
}