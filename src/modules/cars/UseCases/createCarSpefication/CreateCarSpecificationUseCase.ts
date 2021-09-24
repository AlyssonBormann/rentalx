import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";

interface IRequest {
  car_id: string;
  specifications_id: string[];
}

//@injectable()
class CreateCarSpecificationUseCase {
  constructor(
    //@inject("CarsRepository")
    private carsRepository: ICarsRepository,
    private specificationsRepository: ISpecificationsRepository
  ) {}

  async execute({ car_id, specifications_id }: IRequest): Promise<void> {
    const carExists = await this.carsRepository.findById(car_id);

    if (!carExists) {
      throw new AppError("Car does not exists!");
    }

    const spefications = await this.specificationsRepository.findByIds(
      specifications_id
    );

    carExists.specifications = spefications;

    await this.carsRepository.create(carExists);
  }
}

export { CreateCarSpecificationUseCase };
