import { IsAdminUseCase } from '../../../../src/domain/util/IsAdminUseCase';

describe('domain/util/IsAdminUseCase', () => {
  test('Returns whether the handler in the input is an admin', async () => {
    const extractUseCase = {
      execute: jest.fn(() => ['<@U123>']),
    } as any;

    const useCase = new IsAdminUseCase(extractUseCase);
    const result = await useCase.execute('<@U123>', ['U123']);
    expect(result).toBeTruthy;
  });

  test('Returns true when at least one of the handler in the input is an admin', async () => {
    const input = 'this is NOT an admin <@U321> but this is: <@U123>'

    const extractUseCase = {
      execute: jest.fn(() => ['<@U321>', '<@U123>']),
    } as any;

    const useCase = new IsAdminUseCase(extractUseCase);
    const result = await useCase.execute(input, ['U123']);
    expect(result).toBeTruthy;
  });

  test('Returns false when there are no admins in the input', async () => {
    const input = 'this is NOT an admin <@U321> nor this is too <@U987>'

    const extractUseCase = {
      execute: jest.fn(() => ['<@U321>', '<<@U987>']),
    } as any;

    const useCase = new IsAdminUseCase(extractUseCase);
    const result = await useCase.execute(input, ['U123']);
    expect(result).toBeFalsy;
  });

  test('Returns false when there are no handlers in the input', async () => {
    const input = 'this is and input with no handlers'

    const extractUseCase = {
      execute: jest.fn(() => []),
    } as any;

    const useCase = new IsAdminUseCase(extractUseCase);
    const result = await useCase.execute(input, ['U123']);
    expect(result).toBeFalsy;
  });

  test('Returns false if the admin list is not in the right format', async () => {
    const extractUseCase = {
      execute: jest.fn(() => ['<@U123>']),
    } as any;

    const useCase = new IsAdminUseCase(extractUseCase);
    const result = await useCase.execute('<@U123>', ['<@U123>']);
    expect(result).toBeFalsy;
  });
});
