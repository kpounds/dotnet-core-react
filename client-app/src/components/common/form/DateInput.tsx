import React, { FunctionComponent } from "react"
import { FieldRenderProps } from "react-final-form"
import { DateTimePicker } from "react-widgets"
import { Form, FormFieldProps, Label } from "semantic-ui-react"

interface IDateInputProps extends FieldRenderProps<Date, HTMLElement>, FormFieldProps {}

const DateInput: FunctionComponent<IDateInputProps> = ({
  input,
  width,
  placeholder,
  date = false,
  time = false,
  meta: { touched, error },
  id = null,
  ...rest
}) => {
  return (
    <Form.Field error={touched && !!error} width={width}>
      <DateTimePicker
        placeholder={placeholder}
        value={input.value || null}
        onChange={input.onChange}
        date={date}
        time={time}
        {...rest}
        messages={{ dateButton: "Set Date", timeButton: "Set Time" }}
      />
      {touched && error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
    </Form.Field>
  )
}

export default DateInput
