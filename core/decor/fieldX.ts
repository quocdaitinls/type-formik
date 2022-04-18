import {FormikErrors, FormikTouched} from "formik";
import _ from "lodash";
import "reflect-metadata";
import {AnySchema} from "yup";
import {DecoratorKeys} from "../constants";

export type FieldExtraOptions = {};

export type DecoratedFieldMetadata<
  V = any,
  E extends FieldExtraOptions = FieldExtraOptions
> = {
  value: V;
  validation?: AnySchema;
  error?: FormikErrors<V> | string;
  touched?: FormikTouched<V> | boolean;
} & E;

export type DecoratedFieldMetadataMap = Map<string, DecoratedFieldMetadata>;

export const fieldX = <V>(
  fieldOptions: DecoratedFieldMetadata<V>
): PropertyDecorator => {
  return (target: Object, key: string | symbol) => {
    const existingMapForTarget = Reflect.getOwnMetadata(
      DecoratorKeys.Field,
      target
    ) as DecoratedFieldMetadataMap;

    if (_.isNull(existingMapForTarget) || _.isUndefined(existingMapForTarget)) {
      Reflect.defineMetadata(
        DecoratorKeys.Field,
        new Map<string, DecoratedFieldMetadata>(),
        target
      );
    }

    const mapForTarget =
      existingMapForTarget ??
      (Reflect.getOwnMetadata(
        DecoratorKeys.Field,
        target
      ) as DecoratedFieldMetadataMap);

    mapForTarget.set(key as string, fieldOptions);
  };
};
