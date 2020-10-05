import React, { FunctionComponent } from "react"
import { FieldRenderProps } from "react-final-form"
import { Form, FormFieldProps, Label } from "semantic-ui-react"

interface ITextAreaInputProps extends FieldRenderProps<string, HTMLElement>, FormFieldProps {}

const TextAreaInput: FunctionComponent<ITextAreaInputProps> = ({
  input,
  width,
  rows,
  placeholder,
  meta: { touched, error },
}) => {
  return (
    <Form.Field error={touched && !!error} width={width}>
      <textarea rows={rows} {...input} placeholder={placeholder} />
      {touched && error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
    </Form.Field>
  )
}

export default TextAreaInput
