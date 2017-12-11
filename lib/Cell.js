import React from 'react';

class Cell extends React.Component {
  active() {
    return this.props.activeCells.indexOf(this.props.id) >= 0;
  }

  clicked() {
    if (this.guessState() === undefined && this.props.gameState === "recall") {
      this.props.reponseStocke({
        cellId: this.props.id,
        reponseUserCorrecte: this.active()
      });
    }
  }

  guessState() {
    if (this.props.bonneReponse.indexOf(this.props.id) >= 0) {
      return true;
    } else if (this.props.mauvaiseReponse.indexOf(this.props.id) >= 0) {
      return false;
    }
  }

  render() {
    let className = "cell";
    if (this.props.showActiveCells && this.active()) {
      className += " active";
    }
    if (this.guessState() !== undefined) className += " guess-" + this.guessState();

    return (
      <div className={className} onClick={this.clicked.bind(this)}>
      </div>
    );
  }
}

export default Cell;
