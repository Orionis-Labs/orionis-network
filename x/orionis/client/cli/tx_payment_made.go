package cli

import (
	"github.com/spf13/cobra"
	"strconv"

	"github.com/Orionis-Labs/orionis/x/orionis/types"
	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
)

var _ = strconv.Itoa(0)

func CmdPaymentMade() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "payment-made [transactionId] [amount] [result]",
		Short: "Broadcast message PaymentMade",
		Args:  cobra.ExactArgs(3),
		RunE: func(cmd *cobra.Command, args []string) error {
			argsTransactionId, _ := strconv.ParseUint(args[0], 10, 64)
			argsAmount, _ := strconv.ParseUint(args[1], 10, 64)
			argsResult := string(args[2])

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgPaymentMade(clientCtx.GetFromAddress().String(), uint64(argsTransactionId), uint64(argsAmount), string(argsResult))
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}
