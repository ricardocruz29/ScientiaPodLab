package validators

type CreateTTSValidator struct {
	Name					string										`json:"name" validate:"required"`
	Text 					string 										`json:"text" validate:"required"`
	Voice 				string 										`json:"voice" validate:"required"`
}
