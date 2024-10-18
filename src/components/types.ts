// ==================================================================================================================
// TYPES: To export later to extenal file for further import from here
// ==================================================================================================================

type StoreProps = { children: React.ReactNode }

type typeValueData = {
  database:     typeData,
  dispatch:     React.Dispatch<typeAction>,
}

type typeValueDialogs = {
  dialogLaunch: (dialog: string, board?: number, column?: number, task?: number, callBack?: (param: any) => void) => void,
  dialogsData?:  typeDialogs,
  setDialogsData: ([]: typeDialogs) => void,
}

type typeData = {
  currentUser:     typeUser,
  productRequests: typeProductRequest[]
}

type typeProductRequest = {
  id:          number,
  title:       string,
  category:    string,
  upvotes:     number,
  status:      string,
  description: string,
  comments?:   typeComment[] | undefined
}

type typeCategory = 'bug' | 'enhancement' | 'feature'

type typeComment = {
  id:       number,
  content:  string,
  user:     typeUser,
  replies?: typeReply[] | undefined
}

type typeUser = {
  image:    string,
  name:     string,
  username: string
}

type typeReply = {
  content:    string,
  replyingTo: string,
  user:       typeUser
}

type typeShowItem = { show: boolean }

type typeListItems = typeProductRequest & typeShowItem

type typeDialogs = [
  dialog: string,
  productRequests:  number | undefined,
  comments: number | undefined,
  replies:   number | undefined,
  callBack: ((param: any) => void) | undefined
] | undefined

type typeAction = {
  type: 'upvote',
  id: number
}
// ==================================================================================================================
