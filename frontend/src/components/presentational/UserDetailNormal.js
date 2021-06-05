
const UserDetailNormal = ({label, value}) => {
    return (
        <div className = "mx-4 my-3">
            <div className="user-detail-label py-2 px-2">
                {label}
            </div>
            <div className="py-2 px-5">
                {value}
            </div>
        </div>
    )
}

export default UserDetailNormal
