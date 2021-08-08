package worker

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/Orionis-Labs/orionis/x/orionis/types"
	"github.com/relevant-community/oracle/x/oracle/client/cli"
	oracletypes "github.com/relevant-community/oracle/x/oracle/types"
	rpctypes "github.com/tendermint/tendermint/rpc/core/types"

	"github.com/spf13/cobra"
)

type TransactionData struct {
	transactionId uint64 `json:"txnId"`
	amount        uint64 `json:"price"`
	result        string `json:"result"`
}

// HandleTx is our custom tx handler
func HandleTx(cmd *cobra.Command, txEvent rpctypes.ResultEvent) error {
	return nil
}

// HandleBlock is our custom block handler
func HandleBlock(cmd *cobra.Command, blockEvent rpctypes.ResultEvent) error {
	helper, err := cli.NewWorkerHelper(cmd, blockEvent)
	if err != nil {
		return err
	}

	// for each claim type in the array, run the approriate handler
	for _, param := range helper.OracleParams.ClaimParams {
		switch param.ClaimType {
		case types.PaymentMadeClaim:
			getAtomPrice(cmd, helper, param)
		}
	}

	return nil
}

func getAtomPrice(cmd *cobra.Command, helper *cli.WorkerHelper, param oracletypes.ClaimParams) error {

	// use VotePeriod to check if its time to submit a claim
	if helper.IsRoundStart(param.ClaimType) == false {
		return nil
	}

	// fetch the status of the transaction from the payment provider being used
	var transactionData = TransactionData{}
	r, err := http.Get("https://google.com")
	if err != nil {
		fmt.Println("Error fetching ATOM price")
		return err
	}
	defer r.Body.Close()
	json.NewDecoder(r.Body).Decode(&transactionData)

	// create a Claim about payment has been made
	paymentMade := types.NewMsgPaymentMade("", transactionData.transactionId, transactionData.amount, transactionData.result)

	// run process for the given claimType
	if paymentMade == nil {
		fmt.Println("Error creating claim")
		return nil
	}

	// submit our claim
	helper.SubmitWorkerTx(paymentMade)
	return nil
}
