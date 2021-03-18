class Rover {
  constructor(position, mode = "NORMAL", generatorWatts = 110) {
    this.position = position;
    this.mode = mode;
    this.generatorWatts = generatorWatts;
  }
  receiveMessage(message) {
    let answers = {};
    answers.message = message.name;
    answers.results = [];
    let messageCommands = message.commands;
      for (let i = 0; i < messageCommands.length; i++) {
        if (messageCommands[i].commandType === "MODE_CHANGE") {
          this.mode = messageCommands[i].value;
          let resultsObject = {completed: true}
          answers.results.push(resultsObject);
        } else if (messageCommands[i].commandType === "MOVE") {
          if (this.mode === "LOW_POWER") {
            let resultsObject = {completed: false};
            answers.results.push(resultsObject);
          } else if (this.mode === "NORMAL") {
            this.position = messageCommands[i].value;
            let resultsObject = {completed: true};
            answers.results.push(resultsObject);
          }
        } else if (messageCommands[i].commandType === "STATUS_CHECK") {
          let resultsObject = {completed: true, roverStatus: {mode: this.mode, generatorWatts: this.generatorWatts, position: this.position}}
          answers.results.push(resultsObject);
        }
      }
    return answers;
  }
}
module.exports = Rover;