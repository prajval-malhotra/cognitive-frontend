import React from 'react';
import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Spinner from '../Spinner/Spinner';

import { mapExpressionToEmoji } from '../../helpers/emojis';

import './Results.css';
let emotions = ['Angry']

const Results = ({ results, processing }) => {

  function newEmotions() {
    if(results[0].expressions.asSortedArray()[0].expression) {
      emotions.push(results[0].expressions.asSortedArray()[0].expression)
    }
  }

  if (processing && results) {
    return <Spinner />;
  }
  if (!processing && results && results.length > 0) {
    return (
      <div className="results">
        {results.length > 1 ? (
          <div>
            <p>I think...</p>
            {results.map((result, i) => (
              <div className="results__wrapper" key={i}>
                <div style={{ width: '300px' }}>
                  <p>
                    One of you is probably {result.gender}, is looking {result.expressions.asSortedArray()[0].expression} and looks around{' '}
                    {Math.round(result.age)}
                  </p>
                  <p>
                  {/* This is {result.expressions.asSortedArray()[0].expression} */}
                  </p>
                </div>
                <FontAwesomeIcon icon={mapExpressionToEmoji(result.expressions.asSortedArray()[0].expression)} size="4x" />
                <FontAwesomeIcon icon={mapExpressionToEmoji(result.gender)} size="4x" />
              </div>
            ))}
          </div>
        ) : (
          <div className="results__wrapper">
            <div>
              <p>I think...</p>
              <p>You look {results[0].expressions.asSortedArray()[0].expression}</p>
              {/* {console.log(emotions.append(results[0].expressions.asSortedArray()[0].expression))} */}
                if(results[0].expressions.asSortedArray()[0].expression && results[0].expressions.asSortedArray()[0].expression != neutral) {
                  emotions.push(results[0].expressions.asSortedArray()[0].expression)
                }

                {console.log(emotions)}
              {/* <p>You look {setTheArray(prevArray => [...prevArray, results[0].expressions.asSortedArray()[0].expression])}</p> */}
              <p>You seem to be {Math.round(results[0].age)} years old</p>
              <p>I think you are a {results[0].gender}</p>
              {/* {emotions.push(results[0].expressions.asSortedArray()[0].expression)} */}
              {/* <p>This is {emotions.push(results[0].expressions.asSortedArray()[0].expression)}</p> */}
            </div>
            <div className="results__emoji">
              <FontAwesomeIcon icon={mapExpressionToEmoji(results[0].expressions.asSortedArray()[0].expression)} size="4x" />
              <FontAwesomeIcon icon={mapExpressionToEmoji(results[0].gender)} size="4x" />
            </div>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div className="results">
        <Spinner />
      </div>
    );
  }
};

export default Results;
