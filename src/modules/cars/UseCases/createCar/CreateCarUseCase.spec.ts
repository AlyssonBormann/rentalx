import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("deve ser capaz de criar um carro", async () => {
    const car = await createCarUseCase.execute({
      name: "Name Car test",
      description: "Description Car test",
      daily_rate: 100,
      license_plate: "FFF-123",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category",
    });

    expect(car).toHaveProperty("id");
  });

  it("Nao deve ser capaz de criar um carro com mesma placa", async () => {
    const car = {};

    await createCarUseCase.execute({
      name: "Car 1",
      description: "Description Car test",
      daily_rate: 100,
      license_plate: "FFF-123",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category",
    });

    await expect(
      createCarUseCase.execute({
        name: "Car 2",
        description: "Description Car test",
        daily_rate: 100,
        license_plate: "FFF-123",
        fine_amount: 60,
        brand: "Brand",
        category_id: "category",
      })
    ).rejects.toEqual(new AppError("Car already exists!"));
  });

  it("Deve ser possível cadastrar um carro com disponibilidade true", async () => {
    const car = await createCarUseCase.execute({
      name: "Car Available",
      description: "Description Car test",
      daily_rate: 100,
      license_plate: "FFF-123",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category",
    });

    expect(car.available).toBe(true);
  });
});
