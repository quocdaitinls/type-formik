import {DecoratorKeys} from "../constants";
import {DecoratedFormMetadata, HanleConfig, ReactConfig} from "../decor/formX";
import {getFieldConfigFromClass} from "../getFieldConfigFromClass";
import {AnyParamConstructor} from "../types";
import {FormikConfig} from "formik";
import "reflect-metadata";

export type FormOptions<V> = HanleConfig<V> & ReactConfig<V>;

export const parseFormArgs = <V>(
  arg1: FormOptions<V>["onSubmit"] | FormOptions<V>,
  arg2?: Omit<FormOptions<V>, "onSubmit">
): FormOptions<V> => {
  if (typeof arg1 === "function") {
    return {...arg2, onSubmit: arg1} as FormOptions<V>;
  }

  return {...arg1} as FormOptions<V>;
};

export function useFormConfig<V>(
  form: AnyParamConstructor<V>,
  options: FormOptions<V>
): FormikConfig<V>;
export function useFormConfig<V>(
  form: AnyParamConstructor<V>,
  onSubmit: FormOptions<V>["onSubmit"],
  options?: Omit<FormOptions<V>, "onSubmit">
): FormikConfig<V>;
export function useFormConfig<V>(
  form: AnyParamConstructor<V>,
  arg1: FormOptions<V>["onSubmit"] | FormOptions<V>,
  arg2?: Omit<FormOptions<V>, "onSubmit">
): FormikConfig<V> {
  const options = parseFormArgs(arg1, arg2);

  const formDecor = Reflect.getMetadata(
    DecoratorKeys.Form,
    form
  ) as DecoratedFormMetadata<V>;

  let result = {
    ...getFieldConfigFromClass(form),
    ...options,
    ...formDecor,
  };

  return result as FormikConfig<V>;
}
