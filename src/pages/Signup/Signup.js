import { Link, useNavigate } from 'react-router-dom'
import './signup.scss'
import { useRef } from 'react';
import { axiosClient } from '../../utils/axiosClient';
import { KEY_ACCESS_TOKEN, setItem } from '../../localStorageManager';
import { setSpinner } from '../../redux/slices/appConfigSlice';
import { useDispatch } from 'react-redux';


function Signup() {
    const email = useRef('');
    const name = useRef('');
    const password = useRef('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            
            dispatch(setSpinner(false))

            const result = await axiosClient.post('/auth/signup', {
                name: name.current.value,
                email: email.current.value,
                password: password.current.value
            })

            setItem(KEY_ACCESS_TOKEN, result.accessToken);
            navigate('/profile/update');
            window.location.reload(false);


        } catch (error) {
            console.log(error);

        }finally{
            
            dispatch(setSpinner(false))
        }
    }



    return (
        <div className='center' id='signup'>

            <div className="content flexcol">
                <div className="top">
                    <h2>Sign up</h2>

                </div>

                <form onKeyUp={e => e.key === "Enter" ? handleSubmit() : undefined} className="mid flexcol">
                    <div id="name">
                        <input autoFocus maxLength={14} ref={name} autoComplete='off' placeholder='Name' type="text"
                            autoCapitalize='on' id='' />

                    </div>

                    <div id="email">
                        <input ref={email} autoComplete='off' placeholder='E-mail' type="text" id='input-email' />
                    </div>

                    <div id="password">

                        <input ref={password} autoComplete='off' placeholder='Password' type="password" id='input-password' />

                    </div>

                    <div onClick={handleSubmit} className="btn btn-login">


                        <button id="submit">Signup</button>
                    </div>


                </form>
                <div className="bottom">
                    <span>Already a member? <Link to={'/login'}>Login</Link>  </span>



                </div>
            </div>


        </div>
    )
}

export default Signup
