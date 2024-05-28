import { createContext, useContext, useMemo } from "react";

const FormControlContext = createContext(null);
FormControlContext.displayName = 'FormControlContext';

export const useFormControlContext = () => {
  return useContext(FormControlContext);
};

const FormControl = (props) => {
  const {
    isInvalid = false,
    children
  } = props;

  const contextValue = useMemo(() => {
    return {
      isInvalid
    };
  }, [isInvalid]);

  return (
    <FormControlContext.Provider value={contextValue}>
      <div data-form-control="">
        {children}
      </div>
    </FormControlContext.Provider>
  );
};

export default FormControl;
