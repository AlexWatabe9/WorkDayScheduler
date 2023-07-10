
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
 
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
  $(document).ready(function() {
    var currentDate = getDate();
    displayDate(currentDate);
  
    retrieveTasks();
  
    $(".saveBtn").click(function() {
      var timeBlock = $(this).closest(".time-block");
      saveTask(timeBlock);
    });
  
    applyClasses();
  
    loadUserInput();
  });
  
  function getDate() {
    var today = dayjs().format("dddd, MMMM Do");
    return today;
  }
  
  function displayDate(date) {
    $("#currentDay").text(date);
  }
  
  function retrieveTasks() {
    var tasks = JSON.parse(localStorage.getItem("tasks")) || {};
    Object.keys(tasks).forEach(function(time) {
      $("#" + time + " .description").val(tasks[time]);
    });
  }
  
  function saveTask(timeBlock) {
    var time = timeBlock.attr("id");
    var task = timeBlock.find(".description").val();
  
    if (task) {
      var tasks = JSON.parse(localStorage.getItem("tasks")) || {};
      tasks[time] = task;
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }
  
  function applyClasses() {
    var currentHour = dayjs().hour();
    $(".time-block").each(function() {
      var time = parseInt($(this).attr("id"));
      if (time < currentHour) {
        $(this).addClass("past");
      } else if (time === currentHour) {
        $(this).addClass("present");
      } else {
        $(this).addClass("future");
      }
    });
  }
  
  function loadUserInput() {
    $(".time-block").each(function() {
      var time = $(this).attr("id");
      var tasks = JSON.parse(localStorage.getItem("tasks")) || {};
      var task = tasks[time] || "";
      $(this).find(".description").val(task);
    });
  }
  