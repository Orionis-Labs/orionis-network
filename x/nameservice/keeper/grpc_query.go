package keeper

import (
	"github.com/Orionis-Labs/orionis/x/nameservice/types"
)

var _ types.QueryServer = Keeper{}
