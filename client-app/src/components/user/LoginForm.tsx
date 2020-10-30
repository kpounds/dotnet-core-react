import React, { useContext } from "react"
import { Form as FinalForm, Field } from "react-final-form"
import { Button, Form } from "semantic-ui-react"
import { IUserFormValues } from "../../models/User"
import { RootStoreContext } from "../../stores/RootStore"
import TextInput from "../common/form/TextInput"

const LoginForm = () => {
  const { userStore } = useContext(RootStoreContext)
  const { login } = userStore
  return (
    <FinalForm
      onSubmit={(values: IUserFormValues) => login(values)}
      render={({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <Field name="email" component={TextInput} placeholder="Email" />
          <Field name="password" component={TextInput} placeholder="Password" type="password" />
          <Button positive content="Login" />
        </Form>
      )}
    />
  )
}

export default LoginForm
