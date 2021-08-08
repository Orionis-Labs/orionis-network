package types

type AccountKeeper interface {
	// Methods imported from account should be defined here
}

type BankKeeper interface {
	// Methods imported from bank should be defined here
}

type StakingKeeper interface {
	// Methods imported from staking should be defined here
}

type GovKeeper interface {
	// Methods imported from gov should be defined here
}

type MintKeeper interface {
	// Methods imported from mint should be defined here
}

type SlashingKeeper interface {
	// Methods imported from slashing should be defined here
}
