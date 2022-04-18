import "reflect-metadata";
import {FormikConfig} from "formik";
import {ClassDecorator} from "@core/types";
import {DecoratorKeys} from "@core/constants";

export type FieldConfig<V = any> = Pick<
  FormikConfig<V>,
  "initialValues" | "initialErrors" | "initialTouched" | "validationSchema"
>;

export type HanleConfig<V = any> = Pick<
  FormikConfig<V>,
  "onSubmit" | "validate" | "onReset"
>;

export type ReactConfig<V = any> = Pick<
  FormikConfig<V>,
  "component" | "render" | "children"
>;

export type ExtraFormOptions = {};

export type DecoratedFormMetadata<V> = Omit<
  FormikConfig<V>,
  keyof FieldConfig<V> | keyof HanleConfig<V> | keyof ReactConfig<V>
>;

export const formX = <V = any>(
  config?: DecoratedFormMetadata<V>
): ClassDecorator<V> => {
  return (target) => {
    const formConfig = (config ?? {}) as DecoratedFormMetadata<V>;

    Reflect.defineMetadata(DecoratorKeys.Form, formConfig, target);
  };
};
