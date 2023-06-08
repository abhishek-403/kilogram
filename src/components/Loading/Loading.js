import React from 'react'
import spinner from '../../assets/loading3.gif'

function Loading() {
    return (
        <div className='center'
            style={
                {
                    position: "fixed",
                    top: "0px",
                    left: "0px",
                    zIndex: '100',
                    height: "100vh",
                    width: "100vw",
                    backgroundColor: "hsl(0deg 0% 0% / 70%)"

                }
            }
        >
            <div className='flexcol' style={
                {
                    alignItems: "center",
                    gap: "15px",
                    width: "250px"

                }
            } id="box">
                <img style={
                    {
                        height: "45px"

                    }
                } src={spinner} alt="" />
                <p style={{
                    color: "white",
                    fontSize: "var(--small-font-size)",
                    textAlign: "center"

                }}>Please wait as I am using free services, it may take some time  </p>

            </div>
        </div>
    )
}

export default Loading
