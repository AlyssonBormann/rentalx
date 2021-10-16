import { AppError } from "@shared/errors/AppError";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemoy";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserCase: AuthenticateUserUseCase;
let userRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
  beforeEach(() => {
    userRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserCase = new AuthenticateUserUseCase(userRepositoryInMemory);

    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
  });

  it("deve ser possível autenticar o usuario", async () => {
    const user: ICreateUserDTO = {
      driver_license: "1234",
      name: "User Test",
      email: "user@test.com",
      password: "123",
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty("token");
  });

  it("nao deve ser capaz de autenticar um usuario não existente", async () => {
    await expect(
      authenticateUserCase.execute({
        email: "false@email.com",
        password: "000",
      })
    ).rejects.toEqual(new AppError("Email or password incorrect!"));
  });

  it("nao deve ser capaz de autenticar um usuario com senha incorreta", async () => {
    const user: ICreateUserDTO = {
      driver_license: "1234",
      name: "User Test",
      email: "user@test.com",
      password: "123",
    };
    await createUserUseCase.execute(user);
    await expect(
      authenticateUserCase.execute({
        email: user.email,
        password: "incorret-password",
      })
    ).rejects.toEqual(new AppError("Email or password incorrect!"));
  });
});
