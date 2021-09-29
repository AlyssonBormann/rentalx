import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { ICreateRentalDTO } from "../dtos/ICreateRentalDTO";

interface IRentalsRepository {
  create(data: ICreateRentalDTO): Promise<Rental>;
  findOpenRentalByCar(car_id: string): Promise<Rental>;
  findOpenRentalByUser(user_id: string): Promise<Rental>;
}

export { IRentalsRepository };
