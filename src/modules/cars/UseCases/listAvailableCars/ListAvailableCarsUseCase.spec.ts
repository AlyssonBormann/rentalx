import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });

  it("Deve ser capaz de lista todos os carros disponiveis", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Cars Available",
      description: "car description",
      daily_rate: 10,
      license_plate: "ff-gg",
      fine_amount: 50,
      brand: "car_brand",
      category_id: "category_id",
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("Deve ser capaz de listar os carros disponiveis por marca", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car_name",
      description: "car description",
      daily_rate: 10,
      license_plate: "ff-gg1",
      fine_amount: 50,
      brand: "car_brand_teste",
      category_id: "category_id",
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: "car_brand_teste",
    });

    expect(cars).toEqual([car]);
  });

  it("Deve ser capaz de listar os carros disponiveis por nome", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car_name_teste",
      description: "car description",
      daily_rate: 10,
      license_plate: "ff-ggd",
      fine_amount: 50,
      brand: "car_brand_teste",
      category_id: "category_id",
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: "Car_name_teste",
    });

    expect(cars).toEqual([car]);
  });

  it("Deve ser capaz de listar os carros disponiveis por categoria", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car_name_teste",
      description: "car description",
      daily_rate: 10,
      license_plate: "ff-gg",
      fine_amount: 50,
      brand: "car_brand_teste",
      category_id: "12345",
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "12345",
    });

    expect(cars).toEqual([car]);
  });
});
