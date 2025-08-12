import UserNavigation from "./UserNavigation";
import './scss/user-account-layout.scss'

function UserAccountLayout({children}){
    return(
        <div className="account-layout">
        <UserNavigation />
        {children}
        </div>
    )
}

export default UserAccountLayout