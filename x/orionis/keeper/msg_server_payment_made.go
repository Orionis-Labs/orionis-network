package keeper

import (
	"context"

	"github.com/Orionis-Labs/orionis/x/orionis/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k msgServer) PaymentMade(goCtx context.Context, msg *types.MsgPaymentMade) (*types.MsgPaymentMadeResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// TODO: Handling the message
	_ = ctx

	return &types.MsgPaymentMadeResponse{}, nil
}
