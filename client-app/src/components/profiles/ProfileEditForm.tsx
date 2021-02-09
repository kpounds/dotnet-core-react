import React, { FunctionComponent, useContext } from "react"
import { Button, Form } from "semantic-ui-react"
import { Field, Form as FinalForm } from "react-final-form"
import { combineValidators, isRequired } from "revalidate"
import { observer } from "mobx-react"
import { RootStoreContext } from "../../stores/RootStore"
import TextInput from "../common/form/TextInput"
import TextAreaInput from "../common/form/TextAreaInput"

const validationHandler = combineValidators({
  displayName: isRequired({ message: "User's displayName is required" }),
})

interface IProfileEditFormProps {
  toggleFormOpen: (editMode: boolean) => void
}

const ProfileEditForm: FunctionComponent<IProfileEditFormProps> = ({ toggleFormOpen }) => {
  const rootStore = useContext(RootStoreContext)
  const { profile, editProfile, loading } = rootStore.profileStore

  const handleFinalFormSubmit = async (values: any) => {
    await editProfile(values)
    toggleFormOpen(false)
  }

  if (!profile) {
    return <div>No Profile Set!</div>
  }

  return (
    <>
      <FinalForm
        validate={validationHandler}
        initialValues={profile}
        onSubmit={handleFinalFormSubmit}
        render={({ handleSubmit, invalid, pristine }) => (
          <Form onSubmit={handleSubmit} loading={loading}>
            <Field placeholder="Display Name" value={profile.displayName} name="displayName" component={TextInput} />
            <Field placeholder="Bio" value={profile.bio} name="bio" component={TextAreaInput} rows={3} />
            <Button
              floated="right"
              positive
              type="submit"
              content="Update Profile"
              loading={loading}
              disabled={loading || invalid || pristine}
            />
          </Form>
        )}
      />
    </>
  )
}

export default observer(ProfileEditForm)
