import { createContext, useState } from "react";
import { useImmerReducer } from "use-immer"
import data from '../data.json'

export const ContextDatabase = createContext<typeValueData    | undefined>(undefined)
export const ContextDialogs  = createContext<typeValueDialogs | undefined>(undefined)

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
  currentBoard: number | null,
  setCurrentBoard: (board: number | null) => void,
  subtaskChange: boolean,
  setSubTaskChange: (isOpen: boolean) => void
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



type typeDialogs = [
  dialog: string,
  productRequests:  number | undefined,
  comments: number | undefined,
  replies:   number | undefined,
  callBack: ((param: any) => void) | undefined
] | undefined

type typeAction = {
  type: 'read',
  values: typeData
}

//-------------------------
/*
export interface Data {
  currentUser:     User;
  productRequests: ProductRequest[];
}

export interface User {
  image:    string;
  name:     string;
  username: string;
}

export interface ProductRequest {
  id:          number;
  title:       string;
  category:    Category;
  upvotes:     number;
  status:      string;
  description: string;
  comments?:   Comment[];
}

export enum Category {
  Bug = "bug",
  Enhancement = "enhancement",
  Feature = "feature",
}

export interface Comment {
  id:       number;
  content:  string;
  user:     User;
  replies?: Reply[];
}

export interface Reply {
  content:    string;
  replyingTo: string;
  user:       User;
}
//-------------------------
*/
// ==================================================================================================================


export const StoreProvider = ( props: StoreProps ) => {
  // const data = { boards: [] }
  const [dialogsData, setDialogsData]   = useState<typeDialogs | undefined>(undefined)
  const [currentBoard, setCurrentBoard] = useState<number | null>(null)
  const [dialogOpen, setDialogOpen]     = useState(false)

  // ------------------------------------------------------------------------------------
  const [database, dispatch] = useImmerReducer(dataReducer, data, loadData)
  // ------------------------------------------------------------------------------------
  
  function loadData(data: typeData) {
    // Load data from Local Storage, if exist:
    const feedBackStored = localStorage.getItem("pfb_data")
    const feedBackData: typeData = feedBackStored ? JSON.parse(feedBackStored) : data   // Load data

    return feedBackData
  }

  const databaseValue: typeValueData = {
    database: database,
    dispatch: dispatch,
  }

  const dialogsValue: typeValueDialogs = {
    dialogLaunch:     launchDialog,
    dialogsData:      dialogsData,
    setDialogsData:   setDialogsData,
    currentBoard:     currentBoard,
    setCurrentBoard:  setCurrentBoard,
    subtaskChange:    dialogOpen,
    setSubTaskChange: setDialogOpen
  }
  
  function launchDialog( dialog: string, board?: number, column?: number, task?: number, callBack?: (param: any) => void ) {
    const _board  = board != undefined ? board : dialogsData ? dialogsData[1] : 0
    // const _column = column ? column : 0
    // const _task   = task   ? task   : 0
    setDialogsData( [dialog, _board, column, task, callBack] )
  }

  return (
    <ContextDatabase.Provider  value = { databaseValue }>
      <ContextDialogs.Provider value = { dialogsValue  }>
        { props.children }
      </ContextDialogs.Provider>
    </ContextDatabase.Provider>
  )
}

// ===============================================================================================================================
function dataReducer(_data: typeData, action: typeAction): typeData {

  switch (action.type) {
    
    case 'read' : {

      return _data
    }

    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
// ===============================================================================================================================