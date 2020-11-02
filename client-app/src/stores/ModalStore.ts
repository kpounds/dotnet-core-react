import { action, observable } from "mobx"
import { RootStore } from "./RootStore"

export default class ModalStore {
  public rootStore: RootStore
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
  }

  @observable.shallow
  public modal = {
    open: false,
    body: null,
  }

  @action
  public openModal = (content: any) => {
    this.modal.open = true
    this.modal.body = content
  }

  @action
  public closeModal = () => {
    this.modal.open = false
    this.modal.body = null
  }
}
