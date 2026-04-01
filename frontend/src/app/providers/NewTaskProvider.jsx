import { createContext, useContext, useState } from "react";

const NewTaskContext = createContext();

export const NewTaskProvider = ({children}) => {
    const [openNewTaskModal, setOpenNewTaskModal] = useState(false);

    return(
        <NewTaskContext.Provider
        value={{
            openNewTaskModal,
            openModal: () => setOpenNewTaskModal(true),
            closeModal: () => setOpenNewTaskModal(false),
        }}
        >
            {children}
        </NewTaskContext.Provider>
    );
};

export const useTasksUI = () => useContext(NewTaskContext);