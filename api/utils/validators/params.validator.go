package validators

type IDParamsValidator struct {
	ID int `json:"id" uri:"id" validate:"required"`
}

