import { forwardRef } from "react";
import { useFormControlContext } from "./form-control";
import { StyledLabel } from "./form-control.style";
import { dataAttr } from "@/utlis/dom";

const FormLabel = forwardRef((props, ref) => {
  const {
    children,
    ...rest
  } = props;

  const formControl = useFormControlContext();
  const isInvalid = formControl ? formControl.isInvalid : false;

  return (
    <StyledLabel
      data-form-label=""
      data-invalid={dataAttr(isInvalid)}
      ref={ref}
      {...rest}
    >
      {children}
    </StyledLabel>
  );
});

FormLabel.displayName = 'FormLabel';

export default FormLabel;
