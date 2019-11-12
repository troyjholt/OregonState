//This is creation of table object itself.
var table = document.createElement("TABLE");
table.setAttribute("id", "theTable");
table.setAttribute("border", "1px solid black");
document.body.appendChild(table);

//This is the creation of the header row.
var headerRow = document.createElement("TR");
headerRow.setAttribute("id", "headerRow");
document.getElementById("theTable").appendChild(headerRow);

//These are all the header cells.
var h1 = document.createElement("TH");
h1.setAttribute("id", "header1");
var h1Text = document.createTextNode("Header 1");
h1.appendChild(h1Text);
document.getElementById("headerRow").appendChild(h1);

var h2 = document.createElement("TH");
h2.setAttribute("id", "header2");
var h2Text = document.createTextNode("Header 2");
h2.appendChild(h2Text);
document.getElementById("headerRow").appendChild(h2);

var h3 = document.createElement("TH");
h3.setAttribute("id", "header3");
var h3Text = document.createTextNode("Header 3");
h3.appendChild(h3Text);
document.getElementById("headerRow").appendChild(h3);

var h4 = document.createElement("TH");
h4.setAttribute("id", "header4");
var h4Text = document.createTextNode("Header 4");
h4.appendChild(h4Text);
document.getElementById("headerRow").appendChild(h4);

//These are the rest of the cells of the table.
var firstRow = document.createElement("TR");
firstRow.setAttribute("id", "firstRow");
document.getElementById("theTable").appendChild(firstRow);

var cell1 = document.createElement("TD");
cell1.setAttribute("id", "cell1");
var C1Text = document.createTextNode("1,1");
cell1.appendChild(C1Text);
document.getElementById("firstRow").appendChild(cell1);

var cell2 = document.createElement("TD");
cell2.setAttribute("id", "cell2");
var C2Text = document.createTextNode("1,2");
cell2.appendChild(C2Text);
document.getElementById("firstRow").appendChild(cell2);

var cell3 = document.createElement("TD");
cell3.setAttribute("id", "cell3");
var C3Text = document.createTextNode("1,3");
cell3.appendChild(C3Text);
document.getElementById("firstRow").appendChild(cell3);

var cell4 = document.createElement("TD");
cell4.setAttribute("id", "cell4");
var C4Text = document.createTextNode("1,4");
cell4.appendChild(C4Text);
document.getElementById("firstRow").appendChild(cell4);

var row2 = document.createElement("TR");
row2.setAttribute("id", "row2");
document.getElementById("theTable").appendChild(row2);

var cell5 = document.createElement("TD");
cell5.setAttribute("id", "cell5");
var C5Text = document.createTextNode("2,1");
cell5.appendChild(C5Text);
document.getElementById("row2").appendChild(cell5);

var cell6 = document.createElement("TD");
cell6.setAttribute("id", "cell6");
var C6Text = document.createTextNode("2,2");
cell6.appendChild(C6Text);
document.getElementById("row2").appendChild(cell6);

var cell7 = document.createElement("TD");
cell7.setAttribute("id", "cell7");
var C7Text = document.createTextNode("2,3");
cell7.appendChild(C7Text);
document.getElementById("row2").appendChild(cell7);

var cell8 = document.createElement("TD");
cell8.setAttribute("id", "cell8");
var C8Text = document.createTextNode("2,4");
cell8.appendChild(C8Text);
document.getElementById("row2").appendChild(cell8);

var row3 = document.createElement("TR");
row3.setAttribute("id", "row3");
document.getElementById("theTable").appendChild(row3);

var cell9 = document.createElement("TD");
cell9.setAttribute("id", "cell9");
var C9Text = document.createTextNode("3,1");
cell9.appendChild(C9Text);
document.getElementById("row3").appendChild(cell9);

var cell10 = document.createElement("TD");
cell10.setAttribute("id", "cell10");
var C10Text = document.createTextNode("3,2");
cell10.appendChild(C10Text);
document.getElementById("row3").appendChild(cell10);

var cell11 = document.createElement("TD");
cell11.setAttribute("id", "cell11");
var C11Text = document.createTextNode("3,3");
cell11.appendChild(C11Text);
document.getElementById("row3").appendChild(cell11);

var cell12 = document.createElement("TD");
cell12.setAttribute("id", "cell12");
var C12Text = document.createTextNode("3,4");
cell12.appendChild(C12Text);
document.getElementById("row3").appendChild(cell12);

var row4 = document.createElement("TR");
row4.setAttribute("id", "row4");
document.getElementById("theTable").appendChild(row4);

var cell13 = document.createElement("TD");
cell13.setAttribute("id", "cell13");
var C13Text = document.createTextNode("4,1");
cell13.appendChild(C13Text);
document.getElementById("row4").appendChild(cell13);

var cell14 = document.createElement("TD");
cell14.setAttribute("id", "cell14");
var C14Text = document.createTextNode("4,2");
cell14.appendChild(C14Text);
document.getElementById("row4").appendChild(cell14);

var cell15 = document.createElement("TD");
cell15.setAttribute("id", "cell15");
var C15Text = document.createTextNode("4,3");
cell15.appendChild(C15Text);
document.getElementById("row4").appendChild(cell15);

var cell16 = document.createElement("TD");
cell16.setAttribute("id", "cell16");
var C16Text = document.createTextNode("4,4");
cell16.appendChild(C16Text);
document.getElementById("row4").appendChild(cell16);

// These set the default selected cell on start up.
var col = 0;
var row = 1;
select(col, row);

//This function highlights the cell to yellow.
function highlighting()
{
    document.getElementById("theTable").rows[row].cells[col].style.backgroundColor = "yellow";
}

//This bolds the currenctly selected cell.
function select(col, row)
{
    document.getElementById("theTable").rows[row].cells[col].style.borderWidth = "thick";
}


//These functions allow you to traverse through the table without going out of bounds.
function up()
{
    if ((row - 1) < 1)
    {
        row = 1;
    }

    else
    {
        document.getElementById("theTable").rows[row].cells[col].style.borderWidth = "thin";
        row = row - 1;
    }

    //highlighting(col, row);
    select(col, row);
}

function down()
{
    if ((row + 1) > 4)
    {
        row = 4;
    }

    else
    {
        document.getElementById("theTable").rows[row].cells[col].style.borderWidth = "thin";
        row = row + 1;
    }

    //highlighting(col, row);
    select(col, row);
}

function right()
{
    if ((col + 1) > 3)
    {
        col = 3;
    }

    else
    {
        document.getElementById("theTable").rows[row].cells[col].style.borderWidth = "thin";
        col = col + 1;
    }

   // highlighting(col, row);
    select(col, row);
}

function left()
{
    if ((col - 1) < 0)
    {
        col = 0;
    }

    else
    {
        document.getElementById("theTable").rows[row].cells[col].style.borderWidth = "thin";
        col = col - 1;
    }

   // highlighting(col, row);
    select(col, row);
}

//These are the buttons for the table.
var upButton = document.createElement("button");
upButton.setAttribute("id", "upButton");
var upBText = document.createTextNode("UP");
upButton.appendChild(upBText);
document.body.appendChild(upButton);

var downButton = document.createElement("button");
downButton.setAttribute("id", "downButton");
var downBText = document.createTextNode("DOWN");
downButton.appendChild(downBText);
document.body.appendChild(downButton);

var rightButton = document.createElement("button");
rightButton.setAttribute("id", "rightButton");
var rightBText = document.createTextNode("RIGHT");
rightButton.appendChild(rightBText);
document.body.appendChild(rightButton);

var leftButton = document.createElement("button");
leftButton.setAttribute("id", "leftButton");
var leftBText = document.createTextNode("LEFT");
leftButton.appendChild(leftBText);
document.body.appendChild(leftButton);

var highButton = document.createElement("button");
highButton.setAttribute("id", "highButton");
var highBText = document.createTextNode("Mark Cell");
highButton.appendChild(highBText);
document.body.appendChild(highButton);

//These are the events that allow the buttons to do things.
upButton.addEventListener("click", up);
downButton.addEventListener("click", down);
rightButton.addEventListener("click", right);
leftButton.addEventListener("click", left);
highButton.addEventListener("click", highlighting);

//I used the eloquent javascript chapter for reference.
//I used w3schools.com for reference.