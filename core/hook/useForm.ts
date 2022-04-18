import {useFormik} from "formik";
import {AnyParamConstructor} from "../types";
import {FormOptions, useFormConfig} from "./useFormConfig";

export const useForm = <V>(
  form: AnyParamConstructor<V>,
  options: FormOptions<V>
) => {
  return useFormik(useFormConfig(form, options));
};
