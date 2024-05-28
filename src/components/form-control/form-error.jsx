import { forwardRef } from "react";
import { useFormControlContext } from "./form-control";

const FormErrorMessage = forwardRef((props, ref) => {
  const {
    children,
    ...rest
  } = props;

  const formControl = useFormControlContext();
  const isInvalid = formControl ? formControl.isInvalid : true;

  if (!isInvalid) return null;

  return (
    <div
      data-form-error=""
      ref={ref}
      {...rest}
    >
      {children}
    </div>
  );
});

FormErrorMessage.displayName = 'FormErrorMessage';

export default FormErrorMessage;
