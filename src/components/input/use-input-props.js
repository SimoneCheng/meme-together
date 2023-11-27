import { dataAttr } from "@/utlis/dom";

export const useInputProps = (props) => {
  const {
    disabled,
    readOnly,
    required,
    checked,
    isDisabled,
    isReadOnly,
    isRequired,
    isChecked,
    isLoading,
    isInvalid,
    ...rest
  } = props;

  return {
    disabled: disabled ?? isDisabled ?? isLoading,
    readOnly: readOnly ?? isReadOnly,
    required: required ?? isRequired,
    checked: checked ?? isChecked,
    'data-invalid': dataAttr(isInvalid),
    ...rest
  };
};
