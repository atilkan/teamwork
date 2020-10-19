import { UserDTO } from "./user"
import { PlanetDTO } from "./planet"

export interface UserResponseDTO {
  count: number
  next: string | null
  previous: string | null
  results: UserDTO[]
}

export interface PlanetResponseDTO {
  count: number
  next: string | null
  previous: string | null
  results: PlanetDTO[]
}
