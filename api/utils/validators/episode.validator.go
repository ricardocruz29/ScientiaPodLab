package validators

type CreateEpisodeValidator struct {
	Name string `json:"name" validate:"required"`
	Url string `json:"url" validate:"required"`
}

type UpdateEpisodeValidator struct {
	Name string `json:"name"`
	Url string `json:"image"`
}