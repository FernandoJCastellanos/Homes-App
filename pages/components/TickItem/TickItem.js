import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faCircleCheck} from "@fortawesome/free-solid-svg-icons"



export const TickItem = ({children}) => {
    return (
        <div className="grid grid-cols-[50px_1fr] gap-3 mt-7">
            <div className="text-3xl text-green-500 flex justify-center items-center">
                <FontAwesomeIcon icon={faCircleCheck}  />  
            </div>
            <div className="flex flex-col gap-2">
                {children}
            </div>
        </div>
    )
}