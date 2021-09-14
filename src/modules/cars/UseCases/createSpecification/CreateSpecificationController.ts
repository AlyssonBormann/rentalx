import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

class CreateSpecificationController {
  async handler(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    const createSpecificationRepository = container.resolve(
      CreateSpecificationUseCase
    );

    await createSpecificationRepository.execute({ name, description });

    return response.status(201).send();
  }
}

export { CreateSpecificationController };
