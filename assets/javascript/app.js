var config = {
    apiKey: "AIzaSyBbGtmgMRXoPJWwXTQRhd0ffWCxi6FOge4",
    authDomain: "traintime-c6ebf.firebaseapp.com",
    databaseURL: "https://traintime-c6ebf.firebaseio.com",
    projectId: "traintime-c6ebf",
    storageBucket: "traintime-c6ebf.appspot.com",
    messagingSenderId: "179673955029"
};

firebase.initializeApp(config);

var dataRef = firebase.database();

$("button").on("click", function () {
    event.preventDefault();
    var name = $("#trainName").val();
    var destination = $("#destination").val();
    var time = $("#time").val();
    var frequency = $("#frequency").val();

    dataRef.ref().push({
        aname: name,
        bdestination: destination,
        ctime: time,
        dfrequency: frequency
    });
});

dataRef.ref().on("child_added", function (snapshot) {

    var firstTrain = moment(snapshot.val().ctime, 'HH:mm').format("X");

    var frequency = snapshot.val().dfrequency;

    var difference = moment().diff(moment.unix(firstTrain), "minutes");

    var timeLeft = difference - frequency;

    var mins = moment(frequency - timeLeft, "mm").format('mm');

    var nextTrain = moment().add(mins, "m").format("hh:mm A");

    var tr = $("<tr>");
    console.log(Object.keys(snapshot.val()));
    for (value in snapshot.val()) {
        if (value !== "ctime") {
            tr.append(`<td> ${snapshot.val()[value]} </td>`);
        }
    }

    var nextArrival = `<td> ${nextTrain} </td>`;
    var newMin = `<td> ${mins} </td>`;

    tr.append(nextArrival);
    tr.append(newMin);

    $("tbody").append(tr);
    console.log(snapshot.val().ctime);
});

