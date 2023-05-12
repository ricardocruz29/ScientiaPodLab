package validators

type CreatePodcastValidator struct {
	Name string `json:"name" validate:"required"`
	Image string `json:"image" validate:"required"`
}

type UpdatePodcastValidator struct {
	Name string `json:"name"`
	Image string `json:"image"`
}