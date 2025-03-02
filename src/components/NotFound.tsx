import "./NotFound.sass"
import { Link } from 'react-router'

const NotFound = () => {
  return (
    <section className="not-found">
        <div className="not-found__content">
        <h1>404 Not Found</h1>
        <Link to="/">Go back to Home</Link>
        </div>
        <div className="not-found__img">
            <img src="/images/not-found-img.webp" alt="404 Not Found" />
        </div>
 
    </section>
  )
}

export default NotFound