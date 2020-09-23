import React, { FunctionComponent } from "react"
import { Dimmer, Loader } from "semantic-ui-react"

interface ILoadingComponent {
  inverted?: boolean
  content?: string
}

const LoadingComponent: FunctionComponent<ILoadingComponent> = ({ inverted = true, content }) => {
  return (
    <Dimmer active inverted={inverted}>
      <Loader content={content} />
    </Dimmer>
  )
}

export default LoadingComponent
