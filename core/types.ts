export type AnyParamConstructor<T = any> = new (...args: any[]) => T;

export type ClassDecorator<T> = (
  target: AnyParamConstructor<T>
) => AnyParamConstructor<T> | void;

export type PropertyDecorator = (target: Object, propertyKey: string) => void;

export type MethodDecorator = <T>(
  target: Object,
  propertyKey: string,
  descriptor: TypedPropertyDescriptor<T>
) => TypedPropertyDescriptor<T> | void;

export type ParameterDecorator = (
  target: Object,
  propertyKey: string,
  parameterIndex: number
) => void;
