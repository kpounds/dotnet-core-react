import { FORM_ERROR } from "final-form"
import React, { useContext } from "react"
import { Form as FinalForm, Field } from "react-final-form"
import { combineValidators, isRequired } from "revalidate"
import { Button, Form, Header } from "semantic-ui-react"
import { IUserFormValues } from "../../models/User"
import { RootStoreContext } from "../../stores/RootStore"
import ErrorMessage from "../common/form/ErrorMessage"
import TextInput from "../common/form/TextInput"

const validate = combineValidators({
  username: isRequired("username"),
  displayName: isRequired("displayName"),
  email: isRequired("email"),
  password: isRequired("password"),
})

const RegisterForm = () => {
  const { userStore } = useContext(RootStoreContext)
  const { register } = userStore
  return (
    <FinalForm
      onSubmit={(values: IUserFormValues) =>
        register(values).catch((error) => ({
          [FORM_ERROR]: error,
        }))
      }
      validate={validate}
      render={({ handleSubmit, submitting, submitError, invalid, pristine, dirtySinceLastSubmit }) => (
        <Form onSubmit={handleSubmit} error>
          <Header as="h2" content="Sign up to Reactivities" color="teal" textAlign="center" />
          <Field name="username" component={TextInput} placeholder="Username" />
          <Field name="displayName" component={TextInput} placeholder="Display Name" />
          <Field name="email" component={TextInput} placeholder="Email" />
          <Field name="password" component={TextInput} placeholder="Password" type="password" />
          {submitError && !dirtySinceLastSubmit && <ErrorMessage error={submitError} />}
          <Button
            loading={submitting}
            color="teal"
            content="Register"
            fluid
            disabled={(invalid && !dirtySinceLastSubmit) || pristine}
          />
        </Form>
      )}
    />
  )
}

export default RegisterForm
