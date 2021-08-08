package keeper

import (
	"fmt"

	"github.com/tendermint/tendermint/libs/log"

	"github.com/Orionis-Labs/orionis/x/orionis/types"
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
	// this line is used by starport scaffolding # ibc/keeper/import
)

type (
	Keeper struct {
		cdc      codec.Marshaler
		storeKey sdk.StoreKey
		memKey   sdk.StoreKey
		// this line is used by starport scaffolding # ibc/keeper/attribute

		accountKeeper  types.AccountKeeper
		bankKeeper     types.BankKeeper
		stakingKeeper  types.StakingKeeper
		govKeeper      types.GovKeeper
		mintKeeper     types.MintKeeper
		slashingKeeper types.SlashingKeeper
	}
)

func NewKeeper(
	cdc codec.Marshaler,
	storeKey,
	memKey sdk.StoreKey,
	// this line is used by starport scaffolding # ibc/keeper/parameter
	accountKeeper types.AccountKeeper, bankKeeper types.BankKeeper, stakingKeeper types.StakingKeeper, govKeeper types.GovKeeper, mintKeeper types.MintKeeper, slashingKeeper types.SlashingKeeper,
) *Keeper {
	return &Keeper{
		cdc:      cdc,
		storeKey: storeKey,
		memKey:   memKey,
		// this line is used by starport scaffolding # ibc/keeper/return
		accountKeeper: accountKeeper, bankKeeper: bankKeeper, stakingKeeper: stakingKeeper, govKeeper: govKeeper, mintKeeper: mintKeeper, slashingKeeper: slashingKeeper,
	}
}

func (k Keeper) Logger(ctx sdk.Context) log.Logger {
	return ctx.Logger().With("module", fmt.Sprintf("x/%s", types.ModuleName))
}
