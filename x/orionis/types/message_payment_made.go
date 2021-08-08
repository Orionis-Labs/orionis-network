package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/tendermint/tendermint/crypto/tmhash"
	tmbytes "github.com/tendermint/tendermint/libs/bytes"
)

var _ sdk.Msg = &MsgPaymentMade{}

func NewMsgPaymentMade(creator string, transactionId uint64, amount uint64, result string) *MsgPaymentMade {
	return &MsgPaymentMade{
		Creator:       creator,
		TransactionId: transactionId,
		Amount:        amount,
		Result:        result,
	}
}

func (msg *MsgPaymentMade) Route() string {
	return RouterKey
}

func (msg *MsgPaymentMade) Type() string {
	return "PaymentMade"
}

func (msg *MsgPaymentMade) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgPaymentMade) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgPaymentMade) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}

// Hash returns the hash of an Claim Content.
func (c *MsgPaymentMade) Hash() tmbytes.HexBytes {
	bz, err := c.Marshal()
	if err != nil {
		panic(err)
	}
	return tmhash.Sum(bz)
}

// GetRoundID returns the block height for when the data was used.
func (c *MsgPaymentMade) GetRoundID() uint64 {
	return uint64(c.TransactionId)
}

// GetConcensusKey returns a key the oracle will use of vote consensus
// for deterministic results it should be the same as the hash of the content
// for nondeterministic content it should be a constant
func (c *MsgPaymentMade) GetConcensusKey() string {
	return ""
}
