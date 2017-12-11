import React from 'react';

class Footer extends React.Component {
  remainingCount() {
    if (this.props.gameState !== "recall") { return null; }
    return (
      <div className="remaining-count">
      {this.props.activeCellsCount - this.props.bonneReponse.length}
      </div>
    );
  }

  playAgainButton() {
    if (["won", "lost"].indexOf(this.props.gameState) >= 0) {
      return (
        <button className="play-again-button"
        onClick={this.props.playAgain}>
        Rejouer
        </button>
      );
    }
  }

  render() {
    return (
      <div className="footer">
      <div className="hint">
      {this.props.hints[this.props.gameState]}...
        </div>
        {this.remainingCount()}
        {this.playAgainButton()}
        </div>
    );
  }
}

Footer.defaultProps = {
  hints: {
    ready: "Préparez-vous !",
    memorize: "Mémorisez",
    recall: "Reste",
    won: "Bien joué !",
    lost: "Perdu"
  }
};

export default Footer;
