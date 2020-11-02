import { AxiosResponse } from "axios"
import React, { FunctionComponent } from "react"
import { Message } from "semantic-ui-react"

interface IErrorMessageProps {
  error: AxiosResponse
  text?: string
}

const ErrorMessage: FunctionComponent<IErrorMessageProps> = ({ error, text }) => {
  return (
    <Message error>
      <Message.Header>{error.statusText}</Message.Header>
      {text && <Message.Content content={text} />}
    </Message>
  )
}

export default ErrorMessage
