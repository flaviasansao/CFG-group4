
$("#contactWT").click(function () {
    //totalRequired is used to count the number of required elements entered so that the 
    //next section can be displayed once all five are entered.
    let totalRequired = 0;
    let currentElement;
    let requiredInfo = $(".requiredInfo");

    //Change the CSS properties so fields without information entered are highlighted and an error
    //message is displayed.
    for (let i = 0; i < requiredInfo.length; i++) {
        if (requiredInfo[i].value === "") {
            $("#detailsErrorContainer").show();
            currentElement = requiredInfo[i];
            currentElement.style.borderColor = "red";
            currentElement.style.borderWidth = "2px";

        }
        else if (requiredInfo[i].value) {
            totalRequired += 1;
            currentElement = requiredInfo[i];
            currentElement.style.borderColor = "black";
            currentElement.style.borderWidth = "1px";
        }
    }
    if (totalRequired >= 5) {
        $("#detailsErrorContainer").hide();
        $("#mainContact").hide();
        $("#contactMessage").show();
    }
})