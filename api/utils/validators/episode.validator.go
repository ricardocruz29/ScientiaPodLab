package validators

type RenderEpisodeValidator struct {
	NoiseCancellation string `json:"noiseCancellation" validate:"required"`
}
