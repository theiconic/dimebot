import { FindOrCreateUserUseCase } from '../../../../src/domain/user/FindOrCreateUserUseCase';
import { User } from '../../../../src/entity/User';

describe('domain/user/FindOrCreateUserUseCase', () => {
  test('Creates a User when it doesnt exist', async () => {
    const expectedUser = new User('some_handler', 0);

    const repository = {
      findByHandler: jest.fn(() => null),
      save: jest.fn(),
    } as any;

    const useCase = new FindOrCreateUserUseCase(repository);
    const result = await useCase.execute('some_handler');

    expect(repository.findByHandler)
      .toHaveBeenCalledWith('some_handler');

    expect(repository.save)
      .toHaveBeenCalledWith(expectedUser);

    expect(result).toStrictEqual(expectedUser);
  });

  test('Returns a User that already exists', async () => {
    const expectedUser = new User('some_handler', 0);

    const repository = {
      findByHandler: jest.fn(() => expectedUser),
      save: jest.fn(),
    } as any;

    const useCase = new FindOrCreateUserUseCase(repository);
    const result = await useCase.execute('some_handler');

    expect(repository.findByHandler)
      .toHaveBeenCalledWith('some_handler');

    expect(repository.save).not.toHaveBeenCalled();
    expect(result).toStrictEqual(expectedUser);
  });
});
