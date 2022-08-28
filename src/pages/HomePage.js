import { Link } from 'react-router-dom'

function HomePage(){
    return(
    <>
    <h1>Estamos en la HomePage, <Link to="/login">ir a login</Link></h1>
    </>)
}
export default HomePage
