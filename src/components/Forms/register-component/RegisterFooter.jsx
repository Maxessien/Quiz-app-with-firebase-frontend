import { Link } from 'react-router-dom';
import '../scss/form-footer.scss';

function RegisterFooter(){
    // const pStyles = {
    //     fontSize: `${17/16}rem`,
    //     color: 'rgb(102, 102, 102)',
    //     textAlign: 'center'
    // }

    // const aStyles = {
    //     color: 'rgb(74, 2, 92)',
    //     fontWeight: '600'   
    // }
    return(
        <>
        <p className='form-paragraph'>Already have an account <span className='form-link'><Link to={"/login"}>Log In</Link></span> </p>
        </>
    )
}

export default RegisterFooter

