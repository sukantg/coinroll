use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount, Transfer};

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod cryptopayroll {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let state = &mut ctx.accounts.state;
        state.authority = ctx.accounts.authority.key();
        state.merkle_root = [0u8; 32];
        Ok(())
    }

    pub fn update_merkle_root(ctx: Context<UpdateMerkleRoot>, new_root: [u8; 32]) -> Result<()> {
        let state = &mut ctx.accounts.state;
        require!(
            state.authority == ctx.accounts.authority.key(),
            ErrorCode::Unauthorized
        );
        state.merkle_root = new_root;
        Ok(())
    }

    pub fn verify_invoice(
        ctx: Context<VerifyInvoice>,
        proof: Vec<u8>,
        public_inputs: Vec<u8>,
    ) -> Result<()> {
        // TODO: Implement zk proof verification
        // For now, just emit an event
        emit!(InvoiceVerified {
            invoice: ctx.accounts.invoice.key(),
            verifier: ctx.accounts.verifier.key(),
        });
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = authority, space = 8 + 32 + 32)]
    pub state: Account<'info, State>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdateMerkleRoot<'info> {
    #[account(mut)]
    pub state: Account<'info, State>,
    pub authority: Signer<'info>,
}

#[derive(Accounts)]
pub struct VerifyInvoice<'info> {
    #[account(mut)]
    pub state: Account<'info, State>,
    pub invoice: Account<'info, Invoice>,
    pub verifier: Signer<'info>,
}

#[account]
pub struct State {
    pub authority: Pubkey,
    pub merkle_root: [u8; 32],
}

#[account]
pub struct Invoice {
    pub amount: u64,
    pub recipient: Pubkey,
    pub status: InvoiceStatus,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Copy, PartialEq, Eq)]
pub enum InvoiceStatus {
    Pending,
    Paid,
    Verified,
}

#[event]
pub struct InvoiceVerified {
    pub invoice: Pubkey,
    pub verifier: Pubkey,
}

#[error_code]
pub enum ErrorCode {
    #[msg("Unauthorized")]
    Unauthorized,
} 