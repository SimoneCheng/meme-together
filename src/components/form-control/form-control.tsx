import {
  createContext,
  useContext,
  useMemo,
  type ReactNode
} from "react";

type FormControlProps = {
  isInvalid?: boolean;
  children: ReactNode;
};

type FormControlContextValue = Pick<FormControlProps, 'isInvalid'>;

const FormControlContext = createContext<FormControlContextValue>(null);
FormControlContext.displayName = 'FormControlContext';

export const useFormControlContext = () => {
  return useContext(FormControlContext);
};

const FormControl = (props: FormControlProps) => {
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
