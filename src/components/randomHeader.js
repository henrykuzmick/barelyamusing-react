import React, { Component } from 'react';
import {Link, IndexLink} from 'react-router';

function RandomHeader(props) {
  // const fonts = [
  //   'Sirin Stencil',
  //   'Faster One',
  //   'Bungee Outline',
  //   'Vibur',
  //   'Codystar',
  //   'Raleway Dots',
  //   'Vast Shadow',
  //   'Londrina Outline',
  //   'Ewert',
  //   'Megrim',
  //   'Bungee Shade',
  //   'Pompiere',
  //   'Just Me Again Down Here',
  //   'Frijole',
  //   'Fredericka the Great',
  //   'Sue Ellen Francisco',
  //   'Cabin Sketch',
  //   'Press Start 2P',
  //   'Barrio',
  //   'Monoton',
  //   'Special Elite',
  //   'Marck Script',
  //   'Fascinate Inline',
  //   'Great Vibes',
  //   'Shadows Into Light Two',
  //   'Amatic SC',
  //   'Pacifico',
  //   'Lobster',
  //   'Griffy',
  //   'Sirin Stencil'
  // ];
  const quotes = [
    'A sad place for sad people',
    'A webcomic about life and other things',
    'Life is hard.',
    'This is a randomly generated quote.',
    'Pls Follow on social xx',
    'The secret sauce for webcomics',
    'Funny like your uncle',
    'I could be your sugar daddy'
  ]
  // let link = document.createElement('link');
  // let randomFont = fonts[Math.floor(Math.random()*fonts.length)]
  // let fontstyle = {
  //   fontFamily: randomFont
  // }

  let randomQuote = quotes[Math.floor(Math.random()*quotes.length)]
  // link.href=`https://fonts.googleapis.com/css?family=${ randomFont.replace(/\s+/g, '+') }&text=Barely%20Amusing`;
  // link.rel='stylesheet';
  // document.getElementsByTagName('head')[0].appendChild(link);
  return(
    <div className="headerTxt">
      <Link to="/" className="headerName">Barely Amusing</Link>
      <p>{randomQuote}</p>
    </div>
  )
}

export default RandomHeader
