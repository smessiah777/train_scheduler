$(document).ready(function() {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAtaazZRnxu_UyBBGuz8Z3DQCAVkCx9FxM",
    authDomain: "train-scheduler-cf521.firebaseapp.com",
    databaseURL: "https://train-scheduler-cf521.firebaseio.com",
    projectId: "train-scheduler-cf521",
    storageBucket: "train-scheduler-cf521.appspot.com",
    messagingSenderId: "362407230803"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  var tFrequencyRed = 10;
  var tFrequencyPurple = 15;
  var tFrequencyOrange = 7;
  var tFrequencyGreen = 7;
  var tFrequencyBlue = 7;

  // Train Start Times
  var redTime = "04:30";
  var purpleTime = "06:00";
  var orangeTime = "04:30";
  var greenTime = "05:30";
  var blueTime = "05:30";

  // First Time (pushed back 1 year to make sure it comes before current time)
  var firstRed = moment("04:30", "HH:mm");
  var firstPurple = moment("06:00", "HH:mm");
  var firstOrange = moment("04:30", "HH:mm");
  var firstGreen = moment("05:30", "HH:mm");
  var firstBlue = moment("05:30", "HH:mm");

  // // Current Time
  var currentTime = moment().format("hh:mm");

  // // Difference between the times
  var diffTimeRed = moment().diff(moment(firstRed), "minutes");
  var diffTimePurple = moment().diff(moment(firstPurple), "minutes");
  var diffTimeOrange = moment().diff(moment(firstOrange), "minutes");
  var diffTimeGreen = moment().diff(moment(firstGreen), "minutes");
  var diffTimeBlue = moment().diff(moment(firstBlue), "minutes");

  var tRemainderRed = diffTimeRed % tFrequencyRed;
  var tRemainderPurple = diffTimePurple % tFrequencyPurple;
  var tRemainderOrange = diffTimeOrange % tFrequencyOrange;
  var tRemainderGreen = diffTimeGreen % tFrequencyGreen;
  var tRemainderBlue = diffTimeBlue % tFrequencyBlue;

  // // // Minute Until Train
  var nextRed = tFrequencyRed - tRemainderRed;
  var nextPurple = tFrequencyPurple - tRemainderPurple;
  var nextOrange = tFrequencyOrange - tRemainderOrange;
  var nextGreen = tFrequencyGreen - tRemainderGreen;
  var nextBlue = tFrequencyBlue - tRemainderBlue;

  ///time frequency append
  $("#rFreq").append(tFrequencyRed);
  $("#pFreq").append(tFrequencyPurple);
  $("#oFreq").append(tFrequencyOrange);
  $("#gFreq").append(tFrequencyGreen);
  $("#bFreq").append(tFrequencyBlue);

  //timeDiff append
  $("#rDiff").append(diffTimeRed);
  $("#pDiff").append(diffTimePurple);
  $("#oDiff").append(diffTimeOrange);
  $("#gDiff").append(diffTimeGreen);
  $("#bDiff").append(diffTimeBlue);

  //Next Train append
  $("#rNext").append(nextRed);
  $("#pNext").append(nextPurple);
  $("#oNext").append(nextOrange);
  $("#gNext").append(nextGreen);
  $("#bNext").append(nextBlue);

  /////////Capture Input/////////
  $("#submit").on("click", function(event) {
    event.preventDefault();

    $("#train-name").html("");
    $("#destination").html("");
    $("#first-train").html("");
    $("#frequency").html("");

    var tNameInput = $("#train-name")
      .val()
      .trim();
    console.log(tNameInput);
    var destinationInput = $("#destination")
      .val()
      .trim();
    console.log(destinationInput);
    var firstTrainInput = $("#first-train")
      .val()
      .trim();
    console.log(firstTrainInput);
    var frequencyInput = $("#frequency")
      .val()
      .trim();
    console.log(frequencyInput);

    database.ref().push({
      Train_Name: tNameInput,
      Destination: destinationInput,
      First_Train: firstTrainInput,
      Train_Frequency: frequencyInput,
      Date_Added: firebase.database.ServerValue.TIMESTAMP
    });
  });
});
