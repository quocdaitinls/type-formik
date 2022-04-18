import {ObjectShape} from "yup/lib/object";
import {DecoratorKeys} from "./constants";
import {AnyParamConstructor} from "./types";
import * as Yup from "yup";
import {DecoratedFieldMetadataMap} from "./decor/fieldX";
import {FieldConfig} from "./decor/formX";

export const getFieldConfigFromClass = <V>(
  cl: AnyParamConstructor<V>
): FieldConfig<V> => {
  let shape: ObjectShape = {};
  let result: any = {
    initialValues: {},
    initialErrors: {},
    initialTouched: {},
  };

  const decorators = Reflect.getMetadata(
    DecoratorKeys.Field,
    cl.prototype
  ) as DecoratedFieldMetadataMap;

  decorators.forEach((metadata, key) => {
    result.initialValues[key] = metadata.value;
    result.initialErrors[key] = metadata.error;
    result.initialTouched[key] = metadata.touched;

    if (metadata.validation) shape[key] = metadata.validation;
  });

  result.validationSchema = Yup.object(shape);
  return result as FieldConfig<V>;
};
