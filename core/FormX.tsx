import {Formik} from "formik";
import _ from "lodash";
import {FormOptions, useFormConfig} from "./hook/useFormConfig";
import {AnyParamConstructor} from "./types";

export type FormXProps<F> = {
  form: AnyParamConstructor<F>;
} & FormOptions<F>;

export const FormX = <F extends Object>(props: FormXProps<F>) => {
  const options = _.omit(props, ["form"]);
  const formConfig = useFormConfig(props.form, options);

  return <Formik {...formConfig} />;
};
