import "./types"
import { createContext, useState } from "react";
import { useImmerReducer } from "use-immer"
import data from '../data.json'

export const ContextDatabase = createContext<typeValueData    | undefined>(undefined)
export const ContextDialogs  = createContext<typeValueDialogs | undefined>(undefined)
export const StoreProvider = ( props: StoreProps ) => {
  // const data = { boards: [] }
  const [dialogsData, setDialogsData]   = useState<typeDialogs | undefined>(undefined)

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
function dataReducer(draft: typeData, action: typeAction): typeData {

  switch (action.type) {
    
    case 'upvote' : {
      const index = draft.productRequests.findIndex(item => item.id === action.id)
      draft.productRequests[index].upvotes++
      return draft
    }

    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
// ===============================================================================================================================