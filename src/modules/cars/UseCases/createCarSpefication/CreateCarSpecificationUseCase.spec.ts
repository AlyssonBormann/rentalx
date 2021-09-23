import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car Specification", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory
    );
  });

  it("nao deve ser capaz de adicionar uma nova specification caso o carro nao exista", async () => {
    expect(async () => {
      const car_id = "123";
      const specifications_id = ["1234"];

      await createCarSpecificationUseCase.execute({
        car_id,
        specifications_id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("deve ser capaz de adicionar uma nova specification para esse carro", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car Available",
      description: "Description Car test",
      daily_rate: 100,
      license_plate: "FFF-123",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category",
    });

    const specifications_id = ["123"];

    await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id,
    });
  });
});
