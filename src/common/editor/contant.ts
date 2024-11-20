export const emptyInitialValue = "<p></p>";
const emptyValues = ["", emptyInitialValue, "<p><br></p>"];

export const isValueEmpty = (value: string) => emptyValues.includes(value);
