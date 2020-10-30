import { FORM_ERROR } from "final-form"
import React, { useContext } from "react"
import { Form as FinalForm, Field } from "react-final-form"
import { combineValidators, isRequired } from "revalidate"
import { Button, Form, Label } from "semantic-ui-react"
import { IUserFormValues } from "../../models/User"
import { RootStoreContext } from "../../stores/RootStore"
import TextInput from "../common/form/TextInput"

const validate = combineValidators({
  email: isRequired("email"),
  password: isRequired("password"),
})

const LoginForm = () => {
  const { userStore } = useContext(RootStoreContext)
  const { login } = userStore
  return (
    <FinalForm
      onSubmit={(values: IUserFormValues) =>
        login(values).catch((error) => ({
          [FORM_ERROR]: error,
        }))
      }
      validate={validate}
      render={({ handleSubmit, submitting, form, submitError, invalid, pristine, dirtySinceLastSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <Field name="email" component={TextInput} placeholder="Email" />
          <Field name="password" component={TextInput} placeholder="Password" type="password" />
          {submitError && !dirtySinceLastSubmit && (
            <Label color="red" style={{ marginBottom: "10px" }} basic content={submitError.statusText} />
          )}
          <br />
          <Button
            loading={submitting}
            positive
            content="Login"
            disabled={(invalid && !dirtySinceLastSubmit) || pristine}
          />
          <pre>{JSON.stringify(form.getState(), null, 2)}</pre>
        </Form>
      )}
    />
  )
}

export default LoginForm
