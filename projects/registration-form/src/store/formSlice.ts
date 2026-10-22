import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  github: "",
  cv: "",
  telegram: "",
  speciality: "",
  stack: "",
  grade: "",
  textField1: "",
  textField2: "",
  textField3: "",
  textField4: "",
  textField5: "",
  textField6: "",
  textField7: "",
  textField8: "",
  textField9: "",
  textField10: "",
  checkbox1: false,
  checkbox2: false,
  checkbox3: false,
  radioValue: "",
};

export type FormState = typeof initialState;

export type SetFieldPayload = {
  field: keyof FormState;
  value: FormState[keyof FormState];
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setField: (state, action: PayloadAction<SetFieldPayload>) => {
      const { field, value } = action.payload;
      (state as Record<keyof FormState, unknown>)[field] = value;
    },
    resetForm: () => initialState,
  },
});

export const { setField, resetForm } = formSlice.actions;
export default formSlice.reducer;
