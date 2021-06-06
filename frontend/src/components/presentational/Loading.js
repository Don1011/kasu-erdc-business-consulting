const Loading = ({variant}) => {
    if(variant === "button"){
        return (
            <img src="/img/loading.svg" alt="Loading..." className = "loading button-loading" />
        )
    }else if(variant === "page"){
        return (
            <div className = "text-center">
                <img src="/img/loading.svg" alt="Loading..." className = "loading page-loading" />
            </div>
        )
    }
}

export default Loading
