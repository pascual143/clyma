import React from 'react'
import {Link} from 'react-router-dom'

const Home = () => {

  return (

    <section>
      <div>
        <ul className="slideshow">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>

        <div className=""><span> Clima </span></div>
        <div className=""><span> Business</span></div>
        <div className="hoverShow"><span> Products </span></div>




        <div className="centred-buttons">
          <div className="centred-buttons title has-text-centered">
            <span>values companies for how much they pollute</span>
          </div>
          <Link className="" to={'/businesses'}><button className="button homesecond is-medium thumbnail"> Companies </button></Link>
          <Link className="" to = {'/products'}><button className="button home is-medium"> Products</button></Link>
        </div>
      </div>

    </section>

  )
}


export default Home
