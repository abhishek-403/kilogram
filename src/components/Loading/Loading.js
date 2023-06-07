import React from 'react'
import spinner from '../../assets/loading.gif'

function Loading() {
    return (
        <div
            style={
                {
                    position: "fixed",
                    top:"0px",
                    left:"0px",
                    padding:"50vh 50vw",
                    height:"100vh",
                    width:"100vw",
                    backgroundColor:"hsl(0deg 0% 0% / 20%)"

                }
            }
        >
            <img src={spinner} alt="" />
        </div>
    )
}

export default Loading
