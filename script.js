const $container = $('.container')
const $currentDate = $('#currentDay')
const $dayFormat = dayjs().format('dddd, MMMM D YYYY')
//shows day
$currentDate.append($dayFormat)
const currentTime = dayjs().hour()
let workSchedule = ["9","10","11","12","13","14","15","16","17",] //will become 9am-5pm
// give HTML-like structure to each work hour slot
for (i=0; i < workSchedule.length; i++){
  let hourListBox = $('<div>'); 
  let hourList = $('<div>');
  let hourListTextArea = $('<textarea>')
  let saveBtnIcon = $('<i>')
  let hourListSaveBtn = $('<button>')
  
  //adding more class/ID/details
  hourListTextArea.attr('id', 'hour-'+ workSchedule[i])
  hourListTextArea.addClass('textInput')

  // present/future/past classes
  if (workSchedule[i] == currentTime){
    hourListBox.addClass('row time-block present') //red
  } else if (workSchedule[i] > currentTime){
    hourListBox.addClass('row time-block future') //green
  } else if (workSchedule[i] < currentTime){
    hourListBox.addClass('row time-block past') // grey
  }
// add bootstrap classes to list
  hourList.addClass('col-2 col-md-1 hour text-center py-3')
  hourListTextArea.addClass('col-8 col-md-10')
  hourListSaveBtn.addClass('btn saveBtn col-2 col-md-1')
  saveBtnIcon.addClass('fas fa-save') //save button icon
  
  //miliary to AM/PM
  if (workSchedule[i] < 12 ) {
    hourList.text(workSchedule[i]+" AM")
  } else if (workSchedule[i] >= 13) {
    let convertTime = (workSchedule[i]-12);
    hourList.text(convertTime+" PM")
  } else if (workSchedule[i] = 12 ) {
    hourList.text(workSchedule[i]+" PM")
  } 

// should add below header
  $container.append(hourListBox)
  hourListBox.append(hourList)
  hourListBox.append(hourListTextArea)
  hourListBox.append(hourListSaveBtn)
  hourListSaveBtn.append(saveBtnIcon)
}
// stores user's schedule data to localstorage
$(document).ready (function(){

  $('.saveBtn').on("click", function(e){
    let timeSlot = $(this).siblings(".textInput").attr("id");
    let userInput = $(this).siblings(".textInput").val();

    localStorage.setItem(timeSlot, userInput);
  });

for (i=9; i<=17; i++) {
  $("#hour-"+i).text(localStorage.getItem("hour-"+i))
}
});
