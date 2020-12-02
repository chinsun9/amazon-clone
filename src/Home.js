import React from 'react';
import Product from './Product';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <div className="home__container">
        <img
          className="home__image"
          src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Projects/JumpIn/Korea/Fuji_TallHero_JumpIn_KR_FINAL_en_US_1x._CB417168181_.jpg"
          alt="home__image"
        />

        <div className="home__row">
          <Product
            id="1"
            title="a"
            image="https://m.media-amazon.com/images/I/41W5-duvLkL._AC_SY200_.jpg"
            price={0.1}
            rating={5}
          />
          <Product
            id="2"
            title="b"
            image="https://m.media-amazon.com/images/I/41W5-duvLkL._AC_SY200_.jpg"
            price={0.2}
            rating={4}
          />
        </div>

        <div className="home__row">
          <Product
            id="22"
            title="c"
            image="https://m.media-amazon.com/images/I/41W5-duvLkL._AC_SY200_.jpg"
            price={5.0}
            rating={3}
          />
          <Product
            id="23"
            title="d"
            image="https://m.media-amazon.com/images/I/41W5-duvLkL._AC_SY200_.jpg"
            price={4.99}
            rating={2}
          />
          <Product
            id="24"
            title="e"
            image="https://m.media-amazon.com/images/I/41W5-duvLkL._AC_SY200_.jpg"
            price={0.5}
            rating={1}
          />
        </div>

        <div className="home__row">
          <Product
            id="25"
            title="f"
            image="https://m.media-amazon.com/images/I/41W5-duvLkL._AC_SY200_.jpg"
            price={0.49}
            rating={5}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
