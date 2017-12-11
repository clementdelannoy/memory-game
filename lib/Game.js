import React from 'react';

import _ from "lodash";

import Row from "./Row";
import Cell from "./Cell";
import Footer from "./Footer";

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.matrix = [];
    for (let i = 0; i < this.props.rows; i++) {
      let row = [];
      for (let j = 0; j < this.props.columns; j++) {
        row.push(`${i}${j}`);
      }
      this.matrix.push(row);
    }

    let flatMatrix = _.flatten(this.matrix);
    this.activeCells = _.sampleSize(flatMatrix, this.props.activeCellsCount);

    this.state = {
      gameState: "ready",
      mauvaiseReponse: [],
      bonneReponse: []
    };

  }

  componentDidMount() {
    this.memorizeTimerId = setTimeout(() => {
      this.setState({ gameState: 'memorize' }, () => {
        this.recallTimerId = setTimeout(this.startRecallMode.bind(this), 2000);
      });
    }, 2000);
  }

  componentWillUnmount() {
    clearTimeout(this.memorizeTimerId);
    clearTimeout(this.recallTimerId);
    this.finishGame();
  }

  startRecallMode() {
    this.setState({ gameState: 'recall' }, () => {
      this.secondsRemaining = this.props.timeoutSeconds;
      this.playTimerId = setInterval(() => {
        if (--this.secondsRemaining === 0) {
          this.setState({ gameState: this.finishGame("lost") });
        }
      }, 1000);
    });
  }

  reponseStocke({ cellId, reponseUserCorrecte }) {
    let { mauvaiseReponse, bonneReponse, gameState } = this.state;
    if (reponseUserCorrecte) {
      bonneReponse.push(cellId);
      if (bonneReponse.length === this.props.activeCellsCount) {
        gameState = this.finishGame("won");
      }
    } else {
      mauvaiseReponse.push(cellId);
      if (mauvaiseReponse.length > this.props.allowedWrongAttempts) {
        gameState = this.finishGame("lost");
      }
    }
    this.setState({ bonneReponse, mauvaiseReponse, gameState });
  }

  finishGame(gameState) {
    clearInterval(this.playTimerId);
    return gameState;
  }

  render() {
    let showActiveCells =
      ["memorize", "lost"].indexOf(this.state.gameState) >= 0;

    return (
      <div className="grid">
        {this.matrix.map((row, ri) => (
          <Row key={ri}>
            {row.map(cellId => <Cell key={cellId} id={cellId}
                                     showActiveCells={showActiveCells}
                                     activeCells={this.activeCells}
                                     reponseStocke={this.reponseStocke.bind(this)}
                                     {...this.state} />)}
          </Row>
        ))}

        <Footer {...this.state}
                playAgain={this.props.createNewGame}
                activeCellsCount={this.props.activeCellsCount} />
      </div>
    );
  }
}

Game.defaultProps = {
  allowedWrongAttempts: 2,
  timeoutSeconds: 10
};

export default Game;
