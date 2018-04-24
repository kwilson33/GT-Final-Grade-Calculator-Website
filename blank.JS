
function webGet(websiteURL) {
  var  xmlHttpAddress = new XMLHttpRequest();
  xmlHttpAddress.open( "GET", websiteURL, false );
  xmlHttpAddress.send( null );
  return xmlHttpAddress.responseText;
}


function averageScoresComp (input) {
  // average and how many commas
  var average = 0;
  var commas = 0;
  // count the number of commas in the input
  for (var i = 0; i < input.length; i++)
  if (input.charAt(i) == ',') {commas++;}
  // split the input, make float, add to sum of scores
  for (var i = 0; i <= commas; i++)
  average = average + Number(input.split(',')[i]);
  // return (running sum) / (number of commas + 1)
  return average / (commas + 1);
}
function computegrade() {
  var at = averageScoresComp(document.getElementById('at').value);
  var aq = averageScoresComp(document.getElementById('aq').value);
  var ah = averageScoresComp(document.getElementById('ah').value);
  var acp = averageScoresComp(document.getElementById('acp').value);
  var extraCredit = averageScoresComp(document.getElementById('extraCredit').value);
  //structure to store class data
  var classData = {
    subject      : document.getElementById("subject").value,
    desired_grade: document.getElementById("desired_grade").value,
    input          : 'http://cs1371.gatech.edu/getClassInfo/?class='
  };
  classData.input = 'http://cs1371.gatech.edu/getClassInfo/?class=' + classData.subject;
  var gradeWeights = webGet(classData.input);
  gradeWeights = JSON.parse(gradeWeights);
  var neededGrade = (classData.desired_grade - 1*extraCredit - (at* gradeWeights.test/100)  - (gradeWeights.quiz/100 * aq) - (gradeWeights.homework/100 * ah) - (gradeWeights.class_participation/100 * acp)) *100/(gradeWeights.final_exam);
  neededGrade = Math.round(neededGrade*100)/100;
  if (isNaN(neededGrade))  document.getElementById("output").innerHTML = "No grades inputted, try again";
  else document.getElementById("output").innerHTML = neededGrade;
}
