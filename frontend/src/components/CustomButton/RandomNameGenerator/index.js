const data = {
  names: require("./names.json"),
  adjectives: require("./adjectives.json"),
};
let seperator = "-";

function setNames(names) {
  data.names = names;
}

function setAdjectives(adjectives) {
  data.adjectives = adjectives;
}

function setSeperator(new_seperator) {
  seperator = new_seperator;
}

function generate() {
  const ran_a = Math.floor(Math.random() * data.names.length);
  const ran_b = Math.floor(Math.random() * data.adjectives.length);
  const ran_suffix = Math.floor(Math.random() * 100);
  return `${data.adjectives[ran_b]}${seperator}${data.names[ran_a]}${ran_suffix}`;
}

module.exports = {
  setNames: setNames,
  setAdjectives: setAdjectives,
  setSeperator: setSeperator,
  generate: generate,
};
