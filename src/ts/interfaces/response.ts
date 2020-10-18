import { UserDTO } from "./user"
import { PlanetDTO } from "./planet"

export interface ResponseDTO {
  count: number
  next: string | null
  previous: string | null
  results: PlanetDTO[] | UserDTO[]
}
