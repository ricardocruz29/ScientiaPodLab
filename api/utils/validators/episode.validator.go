package validators

type RenderEpisodeValidator struct {
	NoiseCancellation bool `json:"noiseCancellation" validate:"required"`
}
