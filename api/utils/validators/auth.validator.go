package validators

type LoginValidator struct {
	Username string `json:"username" validate:"required"`
	Password string `json:"password" validate:"required"`
}

type RegisterValidator struct {
	Username string `json:"username" validate:"required"`
	Password string `json:"password" validate:"required"`
	Email string `json:"email" validate:"required"`
}

type RefreshTokenValidator struct {
	RefreshToken string `json:"refreshToken" validate:"required"`
}